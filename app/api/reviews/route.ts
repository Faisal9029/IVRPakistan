import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "../../../sanity/env";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const submissions = new Map<string, { count: number; startedAt: number }>();

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = submissions.get(ip);

  if (!current || now - current.startedAt > WINDOW_MS) {
    submissions.set(ip, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > MAX_SUBMISSIONS_PER_WINDOW;
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { name, rating, review, consentGiven, website } = body as Record<string, unknown>;

  // Honeypot: bots may fill this hidden field, while real visitors should leave it empty.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json(
      { message: "Thank you. Your review has been received for moderation." },
      { status: 200 },
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { message: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const patientName = cleanText(name, 80);
  const reviewText = cleanText(review, 1200);
  const numericRating = Number(rating);

  if (
    patientName.length < 2 ||
    reviewText.length < 10 ||
    !Number.isInteger(numericRating) ||
    numericRating < 1 ||
    numericRating > 5 ||
    consentGiven !== true
  ) {
    return NextResponse.json(
      { message: "Please provide a valid name, rating, review, and consent." },
      { status: 400 },
    );
  }

  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    console.error("SANITY_API_TOKEN is not configured for review submissions.");
    return NextResponse.json(
      { message: "Review submissions are temporarily unavailable. Please contact us directly." },
      { status: 503 },
    );
  }

  try {
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
      perspective: "published",
    });

    await writeClient.create({
      _type: "patientReview",
      name: patientName,
      text: reviewText,
      rating: numericRating,
      consentGiven: true,
      status: "pending",
      submittedAt: new Date().toISOString(),
      featured: false,
      displayOrder: 9999,
    });

    return NextResponse.json(
      { message: "Thank you. Your review has been submitted and is awaiting approval." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to save patient review.", error);
    return NextResponse.json(
      { message: "We could not submit your review right now. Please try again later." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    )
  }

  const { fullName, phone, city, reasonForVisit, message, website } = body

  // Honeypot: real users never see or fill this field. If it has a value,
  // the submission is almost certainly a bot — pretend success so the bot
  // doesn't learn to adapt, but skip any further processing.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json(
      { message: "Appointment request received." },
      { status: 200 }
    )
  }

  if (!fullName || !phone || !city || !reasonForVisit) {
    return NextResponse.json(
      { message: "Please provide your name, phone number, city, and reason for the appointment." },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      message:
        "Your appointment request has been received. We will contact you shortly to confirm the details.",
      data: { fullName, phone, city, reasonForVisit, message },
    },
    { status: 200 }
  )
}

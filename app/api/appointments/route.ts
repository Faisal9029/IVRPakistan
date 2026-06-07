import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    )
  }

  const { fullName, email, phone, preferredDate, service } = body
  if (!fullName || !email || !phone || !preferredDate || !service) {
    return NextResponse.json(
      { message: "Please provide all required fields." },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      message:
        "Your appointment request has been received. We will contact you shortly to confirm the details.",
      data: { fullName, email, phone, preferredDate, service },
    },
    { status: 200 }
  )
}

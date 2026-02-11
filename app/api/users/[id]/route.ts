import { NextResponse } from "next/server"
import { User } from "../../../../lib/models/users"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const user = await User.findOne({ username: params.id }).select(
    "name username coverPicture profilePicture userType founded industry isAdmin bio location numberOfLocations link created_at -_id"
  )

  return user
    ? NextResponse.json(user)
    : NextResponse.json({ message: "User not found." }, { status: 404 })
}

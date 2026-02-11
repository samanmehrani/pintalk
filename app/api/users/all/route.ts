import { NextResponse } from "next/server"
import { User } from "../../../../lib/models/users"
import { auth } from "../../../../lib/middlewares/auth"

export const GET = auth(async () => {
  const users = await User.aggregate([
    { $project: { name: 1, username: 1, profilePicture: 1 } },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "author_id",
        as: "posts",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "producer_id",
        as: "products",
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        profilePicture: 1,
        postCount: { $size: "$posts" },
        productCount: { $size: "$products" },
      },
    },
    { $sort: { created_at: -1 } },
  ])

  return NextResponse.json(users)
})
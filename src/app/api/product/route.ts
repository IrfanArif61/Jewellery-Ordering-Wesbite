import Product from "@/Models/Product";
import dbConnect from "@/lib/dbConnect";
import { foodsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const data = await Product.find();

    return NextResponse.json(
      {
        success: true,
        message : data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while fetching products : ", error);
    return NextResponse.json({success : false , message : 'Irfan its not working'},{status:400})
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const {
      name,
      price,
      weight,
      brand,
      description,
      category,
      image,
    }: Partial<foodsType> = await request.json();

    await Product.create({
      name,
      weight,
      price,
      brand,
      description,
      image,
      category,
    });
    return NextResponse.json(
      {

        success : true,
        message: "Product created successfully"

      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while creating product : ", error);

    return NextResponse.json(
      {
        success: false,
        message : error
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();

    const {id} = await request.json()

    if (typeof id !== 'string') {
      return NextResponse.json({
        message: 'Invalid _id'
      },{status:400});
  }

    const product = await Product.findByIdAndDelete({_id:id});

    if (!product)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        message: "Product deleted succefully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while creating product : ", error);
  }
}


export async function PUT(request: Request) {
  try {
    await dbConnect();
    const {
      _id,
      name,
      price,
      weight,
      brand,
      description,
      category,
      image,
    }: Partial<foodsType> = await request.json();


    console.log("Description : ",description)

    const existingProduct = await Product.findById(_id);

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    existingProduct.name = name ?? existingProduct.name;
    existingProduct.price = price ?? existingProduct.price;
    existingProduct.weight = weight ?? existingProduct.weight;
    existingProduct.brand = brand ?? existingProduct.brand;
    existingProduct.description = description ?? existingProduct.description;
    existingProduct.category = category ?? existingProduct.category;
    existingProduct.image = image ?? existingProduct.image;

    await existingProduct.save();

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        updatedProduct: existingProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while updating product: ", error);

    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}

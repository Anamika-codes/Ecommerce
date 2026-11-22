import { NextResponse } from 'next/server';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const orderId = `KST-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: data.customer || {},
      items: data.items || [],
      subtotal: data.subtotal || 0,
      shippingCost: data.shippingCost || 0,
      total: data.total || 0,
      status: 'In Workshop',
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Order created and assigned to workshop fulfillment.',
        order,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

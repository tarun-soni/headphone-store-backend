import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        }
      }
    ],

    shippingAddress: {
      type: String,
      required: true
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },

    paidAt: {
      type: Date
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },

    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order

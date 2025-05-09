const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const apiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'APIVendor',
      required: true
    },
    endpoint: {
      type: String,
      required: true
    },
    method: {
      type: String,
      enum: ['GET', 'POST', 'PUT', 'DELETE'],
      default: 'POST'
    },
    category: {
      type: String,
      enum: [
        'IDENTITY_VERIFICATION',
        'EMPLOYMENT_VERIFICATION',
        'BANK_VERIFICATION',
        'VEHICLE_VERFICATION',
        'CCRV',
        'FINANCIAL'
      ],
      default: null
    },

    inputSchema: {
      type: mongoose.Schema.Types.Mixed
    },
    outputSchema: {
      type: mongoose.Schema.Types.Mixed
    },
    price: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed
    },
    documentType: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Add compound index
apiSchema.index({ vendorId: 1, documentType: 1, isActive: 1 })

// Virtual to get vendor details
apiSchema.virtual('vendor', {
  ref: 'APIVendor',
  localField: 'vendorId',
  foreignField: '_id',
  justOne: true
})

// Add pagination plugin
apiSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('API', apiSchema)

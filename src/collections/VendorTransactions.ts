import type { CollectionConfig } from 'payload'

export const VendorTransactions: CollectionConfig = {
  slug: 'vendor-transaction',
  admin: {
    useAsTitle: 'vendorName',
  },

  fields: [
    {
      name: 'vendorName',
      type: 'relationship',
      relationTo: 'vendor',
      required: true,
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'tokenAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'workingStage',
      type: 'array',
     
      fields: [
        {
          name: 'workingStage',
          type: 'text',
         
        },
        {
          name: 'workingDescription',
          type: 'text',
         
        },
      ],
    },

    {
      name: 'totalCredit',
      type: 'number',
     
    },
    {
      name: 'remainingAmount',
      type: 'number',
     
    },
    {
      name: 'description',
      type: 'text',
 
    },
    {
      name: 'vendorCreatedAt',
      type: 'date',
     
    },
    {
      name: 'vendorUpdatedAt',
      type: 'date',
      
    },
  ],
}

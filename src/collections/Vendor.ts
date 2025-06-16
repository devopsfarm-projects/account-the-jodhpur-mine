import type { CollectionConfig } from 'payload'

export const Vendor: CollectionConfig = {
  slug: 'vendor',
  admin: {
    useAsTitle: 'vendorName',
  },
  fields: [
    {
      name: 'vendorName',
      type: 'text',
      required: true,
    },
    {
      name: 'vendorMobile',
      type: 'text',
      required: true,
    },
    {
      name: 'query_license',
      type: 'text',
      required: true,
    },
    {
      name: 'mining_license',
      type: 'text',
      required: true,
    },
    {
        name: 'near_village',
        type: 'text',
        required: true,
      },
    {
      name: 'tehsil',
      type: 'text',
     
    },
    {
      name: 'district',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
   
    {
      name: 'country',
      type: 'text',
      required: true,
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

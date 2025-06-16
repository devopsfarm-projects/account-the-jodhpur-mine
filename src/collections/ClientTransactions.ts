// ClientTransactions collection
import type { CollectionConfig } from 'payload'
export const ClientTransactions: CollectionConfig = {
  slug: 'client-transaction',
  admin: {
    useAsTitle: 'clientName',
  },
 
  fields: [
    {
      name: 'clientName',
      type: 'relationship',
      relationTo: 'client-accounts',
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
      name: 'clientCreatedAt',
      type: 'date',
     
    },
    {
      name: 'clientUpdatedAt',
      type: 'date',
      
    },
  ],
}

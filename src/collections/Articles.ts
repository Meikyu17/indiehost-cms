import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title', // Affiche le titre dans l'admin
  },
  access: {
    read: () => true, // Tout le monde peut lire
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText', // Utilise l'éditeur Lexical
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true, // Permet de sélectionner plusieurs catégories
      required: false,
      admin: {
        description: 'Sélectionnez une ou plusieurs catégories',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media', // Lien vers la collection Media
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users', // Lien vers la collection Users
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      defaultValue: 'draft',
    },
  ],
}

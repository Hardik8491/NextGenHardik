import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
// import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'next-portfolio',

  projectId: 'euuih2kc',
  dataset: 'production',
  plugins: [
    deskTool(),
    // visionTool()  // Add the visionTool plugin
  ],
  schema: {
    types: schemaTypes,
  },
})

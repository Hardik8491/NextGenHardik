//@ts-nocheck
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'skillSet',
  title: 'SkillSet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of SkillSet',
      type: 'string',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'reference', to: {type: 'skill'}}],
    }),
  ],
})

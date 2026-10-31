import { FormApi, mergeAndUpdate } from '@tanstack/form-core'

const file = new File(['payload'], 'attachment.txt', { type: 'text/plain' })
const form = new FormApi({ defaultValues: { attachment: file } })
mergeAndUpdate(form, (value) => value)

const attachment = form.state.values.attachment
console.log('instanceof File:', attachment instanceof File)
console.log('same object:', attachment === file)
console.log('name/size:', attachment.name, attachment.size)

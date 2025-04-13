import { createFileRoute } from '@tanstack/react-router'
import { ProcessImagesPage } from '~/features/manage/images'

export const Route = createFileRoute('/dashboard/media/process-images')({
  component: ProcessImagesPage,
})

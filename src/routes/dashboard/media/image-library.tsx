import { createFileRoute } from '@tanstack/react-router'
import { ImageLibrary } from '~/features/manage/images'
export const Route = createFileRoute('/dashboard/media/image-library')({
  component: ImageLibrary,
})

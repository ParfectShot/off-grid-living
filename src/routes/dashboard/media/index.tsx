import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { createFileRoute } from '@tanstack/react-router'
import { ImageLibrary, ProcessImagesPage } from '~/features/manage/images'

export const Route = createFileRoute('/dashboard/media/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Manage Media</h1>
  <Tabs defaultValue="image-library">
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="image-library">Image Library</TabsTrigger>
      <TabsTrigger value="process-images">Process Images</TabsTrigger>
    </TabsList>
    <TabsContent value="image-library">
      <ImageLibrary />
      </TabsContent>
      <TabsContent value="process-images">
      <ProcessImagesPage />
    </TabsContent>
  </Tabs>
</div>
}

import { StudioEditor as Editor } from '@grapesjs/studio-sdk'

export const CustomStudioEditor = () => {
  return (
    <Editor
      options={{
        licenseKey:
          '00b44489c5c74676be9aa762d1efccbb871e03b124eb458294cb597417106266',
        project: {
          type: 'web',
          id: 'UNIQUE_PROJECT_ID'
        }
      }}
    />
  )
}

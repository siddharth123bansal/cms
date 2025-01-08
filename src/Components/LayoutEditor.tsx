import grapesjs from 'grapesjs'
import gjsBlockBasic from 'grapesjs-blocks-basic'
import gjsFlex from 'grapesjs-blocks-flexbox'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import 'grapesjs/dist/css/grapes.min.css'
import { FC, useEffect, useRef, useState } from 'react'
//import gjsBoot from "grapesjs-blocks-bootstrap4";
import 'grapesjs-blocks-avance'
import 'grapesjs-plugin-header'
export const LayoutEditor: FC = () => {
  const [loading, setLoading] = useState(true)
  const blocksRef = useRef<HTMLDivElement | null>(null)
  const gjssRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // Ensure both blocksRef and gjsRef are available
    const initEditor = () => {
      if (blocksRef.current && gjssRef.current) {
        const editor = grapesjs.init({
          container: gjssRef.current,
          height: '100vh',
          width: '100%',
          fromElement: false,
          storageManager: {
            type: 'local'
          },
          blockManager: {
            appendTo: blocksRef.current // Set blocksRef as the appendTo container
          },
          plugins: [
            gjsFlex,
            gjsBlockBasic,
            gjsPresetWebpage,
            'grapesjs-blocks-avance',
            'grapesjs-plugin-header',
            'grapesjs-blocks-bootstrap4'
          ],
          pluginsOpts: {
            gjsBlockBasic: {},
            gjsFlex: {},
            gjsPresetWebpage: {},
            'grapesjs-blocks-avance': {},
            'grapesjs-plugin-header': {},
            'grapesjs-blocks-bootstrap4': {
              blocks: {
                // ...
              },
              blockCategories: {
                // ...
              },
              labels: {
                // ...
              }
            }
          },
          codeManager: {
            optsCodeViewer: {
              readOnly: false
            },
            stylePrefix: ''
          },
          canvas: {
            styles: [
              'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            ],
            scripts: [
              'https://code.jquery.com/jquery-3.3.1.slim.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
              'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
            ]
          }
        })

        setLoading(false)

        return () => {
          editor.destroy()
        }
      }
    }

    // Set a small timeout to allow elements to render
    const timeoutId = setTimeout(initEditor, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])
  console.log({
    gjs: gjssRef.current,
    blocksRef: blocksRef.current
  })
  // if (loading) {
  //   return
  // }
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {loading ? (
        <div
          style={{ flex: 1, height: '100vh' }}
          className="bg-white font-white h-full"
        >
          Loading...
        </div>
      ) : null}
      <div
        ref={blocksRef}
        className="w-52"
        style={{ height: '100vh' }}
        id="blocks"
      ></div>
      <div ref={gjssRef} id="gjs" style={{ flex: 1, height: '100vh' }}></div>
    </div>
  )
}

import { Arrow90degUp } from '@styled-icons/bootstrap/Arrow90degUp'
import { Download, Trash, Upload } from '@styled-icons/octicons'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import tw from 'tailwind-styled-components'
import { calculateContrastColor } from '../lib/colormath'
import { colorSchemePresets } from '../lib/colorschemes'
import { process } from '../pkg'

const Button = tw.button`
m-2 inline-block rounded bg-slate-500 p-2
`

const Faerber = () => {
  const previewCanvasRef = useRef()
  const resultCanvasRef = useRef()
  const customColorRef = useRef()
  const [selColors, setSelColors] = useState(colorSchemePresets['Dracula'])
  const [selMethod, setSelMethod] = useState('76')
  const [buffer, setBuffer] = useState(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [downloadable, setDownloadable] = useState(false)

  // loads the uploaded image to a blob & displays it in the preview
  const loadImage = (e) => {
    // clear the previous canvas & reset the buffer state
    previewCanvasRef.current
      .getContext('2d')
      .clearRect(0, 0, imageSize.width, imageSize.height)
    setBuffer(null)

    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        // create an ImageData object
        const canvas = previewCanvasRef.current
        const ctx = canvas.getContext('2d')
        const imgData = ctx.createImageData(img.width, img.height)
        canvas.width = img.width
        canvas.height = img.height
        setImageSize({ width: img.width, height: img.height })
        // copy the image contents to the ImageData object
        ctx.drawImage(img, 0, 0)
        const pix = ctx.getImageData(0, 0, img.width, img.height).data
        for (let i = 0; i < pix.length; i += 4) {
          imgData.data[i] = pix[i]
          imgData.data[i + 1] = pix[i + 1]
          imgData.data[i + 2] = pix[i + 2]
          imgData.data[i + 3] = 255
        }
        // set the ImageData object to the canvas
        ctx.putImageData(imgData, 0, 0)
        setBuffer(imgData.data)
      }
    }
  }

  const downloadResult = () => {
    resultCanvasRef.current.getContext('2d').canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'result.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  const addCustomColor = () => {
    const color = customColorRef.current.value
    const regex = /^#[\dA-F]{6}$/i
    if (regex.test(color)) {
      setSelColors([...selColors, color])
      customColorRef.current.value = ''
    }
  }

  useEffect(() => {
    const getColorscheme = () => {
      const flat = []
      // convert the array of #rrggbb strings to an array of [r, g, b] arrays
      selColors.forEach((val) => {
        val = val.replace('#', '')
        const rgb = [val.slice(0, 2), val.slice(2, 4), val.slice(4, 6)]
        rgb.map((v) => (v = flat.push(parseInt(v, 16))))
      })
      return new Uint8Array(flat)
    }

    if (buffer) {
      // convert to Uint8Array, to pass it on to webassembly
      // get the converted colorscheme
      const colorscheme = getColorscheme()
      // call webassembly
      process(
        buffer,
        imageSize.width,
        imageSize.height,
        selMethod,
        colorscheme,
        'resultCanvas'
      )
      setDownloadable(true)
    }
  }, [buffer, selMethod, selColors, imageSize.width, imageSize.height])

  return (
    <>
      <Head>
        <title>farbenfroh.io :: faerber</title>
      </Head>
      <div className="h-full bg-slate-800 text-gray-100">
        <div className="pt-8 text-center md:p-0">
          <h1 className="bg-gradient-to-r from-pink-500 to-violet-400 bg-clip-text p-4 font-lobster text-8xl text-transparent">
            faerber
          </h1>
          <h2 className="my-2 text-2xl">
            Makes your wallpaper fit your favorite colorscheme!
          </h2>
          <p className="prose mx-auto max-w-md text-gray-200">
            When you spent a lot of time tweaking your OS, you don{"'"}t want to
            just grab any old wallpaper that might not fit your favorite look.
            Drop it here, and it might just look great!
          </p>
        </div>
        <div className="py-4 text-center">
          <Button $as="label" htmlFor="inputImage">
            <input
              type="file"
              accept="image/png,image/webp,image/jpeg"
              name="inputImage"
              id="inputImage"
              className="sr-only"
              onChange={(e) => loadImage(e)}
            />
            <Upload className="h-5 w-5" />
            Upload
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 p-2 lg:flex-row">
          <div className="flex aspect-video w-full items-center justify-center border border-gray-600 bg-gray-800 p-4">
            <canvas
              ref={previewCanvasRef}
              className="max-h-full max-w-full"
            ></canvas>
          </div>
          <div className="flex aspect-video w-full items-center justify-center border border-gray-600 bg-gray-800 p-4">
            <canvas
              id="resultCanvas"
              ref={resultCanvasRef}
              className="max-h-full max-w-full"
            ></canvas>
          </div>
        </div>
        {downloadable && (
          <div className="py-4 text-center">
            <Button onClick={() => downloadResult()}>
              <Download className="h-5 w-5"></Download>
              <span>Download</span>
            </Button>
          </div>
        )}
        <div>
          <div className="mx-auto max-w-xl ">
            <h3 className="mx-auto max-w-fit rounded-t-lg border border-b-0 border-slate-500 bg-slate-700 px-4 text-center text-xl">
              Colors to match against:
            </h3>
            <div className="divide-y divide-dashed divide-slate-400 overflow-hidden rounded-xl border border-slate-500 bg-slate-700 shadow-lg">
              <div className="pb-2">
                <div className="grid grid-cols-4 font-mono">
                  {selColors.map((el, i) => (
                    <div
                      key={i}
                      className="group relative flex items-center justify-center border-slate-800/30 p-2 transition-[shadow,transform] hover:z-10 hover:scale-105 hover:shadow"
                      style={{ background: `${el}` }}
                    >
                      <span
                        className="h-6 rounded px-1"
                        style={{ color: `${calculateContrastColor(el)}` }}
                      >
                        {el.toUpperCase()}
                      </span>
                      <Trash
                        className="absolute right-2 h-6 w-6 cursor-pointer rounded p-1 opacity-0 transition-transform hover:scale-125 hover:opacity-100 group-hover:opacity-75"
                        style={{ color: `${calculateContrastColor(el)}` }}
                        onClick={() => {
                          const newArr = [...selColors]
                          newArr.splice(i, 1)
                          setSelColors(newArr)
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 py-2">
                  <label className="flex items-center" htmlFor="customColorAdd">
                    <Arrow90degUp className="mr-1 h-4 w-4 -translate-y-0.5" />
                    Custom color
                  </label>
                  <input
                    type="text"
                    id="customColorAdd"
                    ref={customColorRef}
                    className="bg-slate-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addCustomColor()
                      }
                    }}
                  />
                  <button
                    className="bg-slate-500 px-2"
                    onClick={() => addCustomColor()}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="py-2 text-center">
                <p className="pb-2 text-lg">
                  Here are some colorscheme presets for you:
                </p>
                <div className="flex justify-center gap-3">
                  {Object.keys(colorSchemePresets).map((preset) => (
                    <button
                      key={preset}
                      className="rounded bg-slate-600 p-1 transition-[transform,shadow] hover:-translate-y-1 hover:scale-110 hover:shadow-lg"
                      onClick={() => setSelColors(colorSchemePresets[preset])}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <div className="mt-1 text-sm">
                  <p>Your favorite colorscheme is missing? 🙀</p>
                  <p>
                    How about you{' '}
                    <a
                      href="https://github.com/farbenfroh/farbenfroh.io"
                      className="underline"
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      open a PR/create an issue
                    </a>
                    ?
                  </p>
                </div>
              </div>
              <div className="py-2">
                <div className="mx-auto max-w-fit">
                  <label htmlFor="methodSelector" className="block">
                    Color comparison method:
                  </label>
                  <select
                    id="methodSelector"
                    name="methodSelector"
                    className="mt-1 block w-full rounded-md border-gray-300 bg-slate-700 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue={selMethod}
                    onChange={(e) => setSelMethod(e.target.value)}
                  >
                    <option value="76">Delta E 76</option>
                    <option value="94t">Delta E 94-T</option>
                    <option value="94g">Delta E 94-G</option>
                    <option value="2000">Delta E 2000</option>
                  </select>
                </div>
                <p className="prose-lg p-4 text-gray-100">
                  The color comparison method is how the algorithm calculates
                  the difference between each pixel in your image & the limited
                  colors in your colorscheme. The numbers correspond to the
                  years the standard were set by the CIE. Newer standards
                  require more computing power, but might give better / more
                  accurate results. More accurate isn{"'"}t always {"'"}better
                  {"'"} - since people like vinyl, and Instagram filters, old
                  standards are also included. Because art.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 text-center opacity-30 transition ease-linear hover:-translate-y-1 hover:opacity-100">
          a project by{' '}
          <a href="https://github.com/nekowinston" className="text-blue-800">
            winston 🤘
          </a>
        </div>
      </div>
    </>
  )
}

export default Faerber

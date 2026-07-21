"use client";

import BackButton from "@/components/ui/backButton";
import { Upload } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { products, Product } from "@/lib/collectionsProducts";

const LIPS_OUTER = [
  61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291,
  375, 321, 405, 314, 17, 84, 181, 91, 146, 61,
];
const LIPS_INNER = [
  78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308,
  324, 318, 402, 317, 14, 87, 178, 88, 95, 78,
];

function TryonInner() {
  const searchParams = useSearchParams();

  const [productValue, setProductValue] = useState("");
  const [shadeValue, setShadeValue] = useState("");
  const [selectedColour, setSelectedColour] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const landmarksRef = useRef<any[] | null>(null);

  const selectedProduct = products.find((p) => p.name === productValue) ?? null;

  // Pre-select product/shade if arriving from a product page via
  // "Try It On Virtually" — expects ?product=<slug>&shade=<shadeName>
  useEffect(() => {
    const slug = searchParams.get("product");
    const shadeName = searchParams.get("shade");
    if (!slug) return;

    const matchedProduct = products.find((p) => p.slug === slug);
    if (!matchedProduct) return;

    const matchedShade =
      matchedProduct.shades.find((s) => s.shadeName === shadeName) ??
      matchedProduct.shades[0];

    setProductValue(matchedProduct.name);
    setShadeValue(matchedShade.shadeName);
    setSelectedColour(matchedShade.colour);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const fileset = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        let landmarker: FaceLandmarker;
        try {
          landmarker = await FaceLandmarker.createFromOptions(fileset, {
            baseOptions: {
              modelAssetPath: "/models/face_landmarker.task",
              delegate: "GPU",
            },
            runningMode: "IMAGE",
            numFaces: 1,
          });
        } catch (gpuErr) {
          console.warn("GPU delegate failed, falling back to CPU:", gpuErr);
          landmarker = await FaceLandmarker.createFromOptions(fileset, {
            baseOptions: {
              modelAssetPath: "/models/face_landmarker.task",
              delegate: "CPU",
            },
            runningMode: "IMAGE",
            numFaces: 1,
          });
        }

        if (!cancelled) {
          landmarkerRef.current = landmarker;
          setReady(true);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Couldn't load the try-on model. Try refreshing.");
      }
    }
    init();
    return () => {
      cancelled = true;
      landmarkerRef.current?.close();
    };
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  function handleImageLoad() {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const landmarker = landmarkerRef.current;
    if (!img || !canvas || !landmarker) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const result = landmarker.detect(img);
    landmarksRef.current = result.faceLandmarks?.[0] ?? null;

    drawOverlay();
  }

  useEffect(() => {
    drawOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColour, selectedProduct?.category]);

  function drawOverlay() {
    const canvas = canvasRef.current;
    const landmarks = landmarksRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!landmarks || !selectedColour || !selectedProduct) return;

    const { width, height } = canvas;
    const category = selectedProduct.category;

    if (category === "Lip liner") {
      drawLiner(ctx, landmarks, width, height, selectedColour);
    } else {
      const alpha = category === "Lip tint" ? 0.3 : 0.55;
      drawFill(ctx, landmarks, width, height, selectedColour, alpha);
      if (category === "Lip gloss") {
        drawShine(ctx, landmarks, width, height);
      }
    }
  }

  function tracePath(
    ctx: CanvasRenderingContext2D,
    points: number[],
    landmarks: any[],
    width: number,
    height: number
  ) {
    const pts = points.map((idx) => ({
      x: landmarks[idx].x * width,
      y: landmarks[idx].y * height,
    }));

    const start = {
      x: (pts[0].x + pts[1].x) / 2,
      y: (pts[0].y + pts[1].y) / 2,
    };
    ctx.moveTo(start.x, start.y);

    for (let i = 1; i < pts.length - 1; i++) {
      const midX = (pts[i].x + pts[i + 1].x) / 2;
      const midY = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
    }
    ctx.closePath();
  }

  function drawFill(
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number,
    colour: string,
    alpha: number
  ) {
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d")!;

    maskCtx.beginPath();
    tracePath(maskCtx, LIPS_OUTER, landmarks, width, height);
    tracePath(maskCtx, LIPS_INNER, landmarks, width, height);
    maskCtx.fillStyle = "#fff";
    maskCtx.fill("evenodd");

    const blurRadius = Math.max(2, width * 0.006);
    maskCtx.filter = `blur(${blurRadius}px)`;
    maskCtx.drawImage(maskCanvas, 0, 0);
    maskCtx.filter = "none";

    maskCtx.globalCompositeOperation = "source-in";
    maskCtx.fillStyle = colour;
    maskCtx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.restore();
  }

  function drawLiner(
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number,
    colour: string
  ) {
    ctx.save();
    ctx.beginPath();
    tracePath(ctx, LIPS_OUTER, landmarks, width, height);
    ctx.strokeStyle = colour;
    ctx.lineWidth = Math.max(1.2, width * 0.0022);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.75;
    ctx.stroke();
    ctx.restore();
  }

  function drawShine(
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number
  ) {
    const topCenter = landmarks[13];
    const x = topCenter.x * width;
    const y = topCenter.y * height;
    const r = width * 0.03;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }

  return (
    // min-h-screen (not h-screen) + top padding so this section starts
    // below the navbar instead of behind it. Adjust pt-24 to match your
    // navbar's actual rendered height.
    <div className="w-full flex flex-col min-h-screen">
      <div className="">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] max-w-screen flex-1 min-h-[600px]">
        {/* Upload section */}
        <div className="min-h-[600px] max-w-full bg-[#f7dae7] relative">
          {!imageUrl ? (
            <section className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center h-[80%] w-[80%] border-2 border-dashed border-[#af2a4f] rounded-2xl gap-5">
                <button className="p-5 rounded-full bg-[#4a2e27]" type="button">
                  <Upload className="text-pink-100" />
                </button>
                <h2 className="text-2xl text-[#590d22] font-outfit">
                  Upload your Photo
                </h2>
                <p className="font-openSans text-sm mb-4">
                  See how {productValue ? productValue : "any product"} in{" "}
                  {shadeValue ? shadeValue : "any shade"} looks on you.
                </p>
                <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 hover:text-indigo-500">
                  <span className="p-3 rounded-2xl bg-[#b3448d] hover:bg-[#7a1f53] font-openSans text-[#fff3e7]">
                    Choose your image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                {!ready && !error && (
                  <p className="text-xs text-[#8a4067]">Loading try-on model…</p>
                )}
                {error && <p className="text-xs text-red-600">{error}</p>}
              </div>
            </section>
          ) : (
            <div className="relative h-full w-full flex items-center justify-center overflow-hidden py-6">
              <div className="relative inline-block max-h-full max-w-full leading-none">
                <img
                  ref={imgRef}
                  src={imageUrl}
                  alt=""
                  onLoad={handleImageLoad}
                  className="block max-h-[70vh] max-w-full object-contain"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </div>
              <label className="absolute bottom-4 cursor-pointer">
                <span className="p-2 rounded-xl bg-[#b3448d] hover:bg-[#7a1f53] font-openSans text-[#fff3e7] text-sm">
                  Change photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>

        {/* Product selection sidebar */}
        <div className="bg-[#590d22] w-full flex flex-col min-h-[600px]">
          <a href="/collections" className="font-outfit text-white text-xl text-right my-4 px-5 block shrink-0">
            Browse
          </a>

          <div className="flex flex-col gap-4 flex-1 min-h-0 p-4">
            {/* Shades */}
            <div className="cursor-default bg-[#fff3e7] p-4 rounded-xl flex flex-col flex-1 min-h-0">
              <h1 className="text-[#800f2f] text-center font-outfit font-bold mb-3 shrink-0">
                Product Shades
              </h1>
              <div className="overflow-y-auto flex-1 min-h-0 pr-1">
                {selectedProduct ? (
                  <div className="flex flex-col gap-2">
                    {selectedProduct.shades.map((shade, id) => (
                      <div
                        key={id}
                        className={`p-3 rounded-xl flex justify-between items-center gap-4 hover:bg-[#ffe5ec] transition-all cursor-pointer ${
                          shadeValue === shade.shadeName ? "bg-[#ffe5ec]" : ""
                        }`}
                        onClick={() => {
                          setShadeValue(shade.shadeName);
                          setSelectedColour(shade.colour);
                        }}
                      >
                        <p className="text-[#39131f] font-outfit">{shade.shadeName}</p>
                        <div
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: shade.colour }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#39131f] font-outfit text-center py-4">
                    Select a product...
                  </p>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="bg-[#fff3e7] p-4 rounded-xl flex flex-col flex-1 min-h-0">
              <h1 className="text-[#800f2f] text-center font-outfit font-bold mb-3 shrink-0">
                Switch Product
              </h1>
              <div className="overflow-y-auto flex-1 min-h-0 pr-1">
                {products.map((product) => (
                  <div
                    key={product.slug}
                    className="p-3 text-[#39131f] font-outfit cursor-pointer rounded-xl hover:bg-[#ffe5ec] transition-all"
                    onClick={() => {
                      setProductValue(product.name);
                      setShadeValue("");
                      setSelectedColour(null);
                    }}
                  >
                    <div className="flex justify-between items-center gap-5">
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <div className="flex gap-2 text-sm opacity-80">
                          <p>{product.category}</p>
                          <p>&#x2022;</p>
                          <p>${product.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {product.shades.slice(0, 4).map((shade, cid) => (
                          <div
                            key={cid}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: shade.colour }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Tryon() {
  return (
    <Suspense fallback={null}>
      <TryonInner />
    </Suspense>
  );
}
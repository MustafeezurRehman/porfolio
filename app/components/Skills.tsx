"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  siJavascript,
  siTypescript,
  siReact,
  siNodedotjs,
  siAngular,
  siPython,
  siExpress,
  siNestjs,
  siRedux,
  siGraphql,
  siTailwindcss,
  siFlask,
  siPostgresql,
  siMongodb,
  siMysql,
  siApachekafka,
  siRedis,
  siLangchain,
  siCircleci,
  siJest,
  siGit,
  siNginx,
} from "simple-icons";
import SectionHeader from "./SectionHeader";

type Skill = { name: string; color: string; path: string; scale?: number };

// AWS and OpenAI aren't in simple-icons (trademark) — inline custom paths
const AWS_PATH =
  "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963zM3.16 11.385c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.295.838.295zm7.125.957c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.736 4.787c-.048-.16-.072-.263-.072-.32 0-.127.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.498 5.904 1.39-5.904c.04-.16.088-.264.151-.312a.55.55 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.064.048.12.16.151.312l1.405 5.976 1.541-5.976c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.13 1.13 0 0 1-.056.2l-2.149 6.917c-.048.16-.103.263-.167.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.382-5.752-1.37 5.744c-.039.16-.087.264-.15.32-.065.056-.177.08-.32.08zm11.405.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607zm1.094-1.252c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.398.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.030-2.57.694-2.995z";
const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

const skills: Skill[] = [
  { name: "JavaScript", color: "#" + siJavascript.hex, path: siJavascript.path },
  { name: "TypeScript", color: "#" + siTypescript.hex, path: siTypescript.path },
  { name: "React", color: "#" + siReact.hex, path: siReact.path },
  { name: "Node.js", color: "#" + siNodedotjs.hex, path: siNodedotjs.path },
  { name: "Angular", color: "#dd0031", path: siAngular.path },
  { name: "Python", color: "#" + siPython.hex, path: siPython.path },
  { name: "Express", color: "#e6edf3", path: siExpress.path, scale: 0.6 },
  { name: "NestJS", color: "#" + siNestjs.hex, path: siNestjs.path },
  { name: "Redux", color: "#" + siRedux.hex, path: siRedux.path },
  { name: "GraphQL", color: "#" + siGraphql.hex, path: siGraphql.path },
  { name: "Tailwind", color: "#" + siTailwindcss.hex, path: siTailwindcss.path },
  { name: "Flask", color: "#" + siFlask.hex, path: siFlask.path },
  { name: "PostgreSQL", color: "#" + siPostgresql.hex, path: siPostgresql.path },
  { name: "MongoDB", color: "#" + siMongodb.hex, path: siMongodb.path },
  { name: "MySQL", color: "#" + siMysql.hex, path: siMysql.path },
  { name: "Kafka", color: "#e6edf3", path: siApachekafka.path },
  { name: "Redis", color: "#" + siRedis.hex, path: siRedis.path },
  { name: "AWS", color: "#ff9900", path: AWS_PATH },
  { name: "OpenAI", color: "#10a37f", path: OPENAI_PATH },
  { name: "LangChain", color: "#" + siLangchain.hex, path: siLangchain.path },
  { name: "CircleCI", color: "#e6edf3", path: siCircleci.path },
  { name: "Jest", color: "#" + siJest.hex, path: siJest.path },
  { name: "Git", color: "#" + siGit.hex, path: siGit.path },
  { name: "NGINX", color: "#" + siNginx.hex, path: siNginx.path },
];

const RADIUS_MAX = 270;

function pickRadius(w: number) {
  if (w < 380) return 115;
  if (w < 480) return 140;
  if (w < 640) return 175;
  if (w < 768) return 210;
  if (w < 1024) return 240;
  return RADIUS_MAX;
}

type V3 = [number, number, number];

function buildIcosahedron() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw: V3[] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ];
  const verts = raw.map(([x, y, z]): V3 => {
    const l = Math.sqrt(x * x + y * y + z * z);
    return [x / l, y / l, z / l];
  });
  const faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];
  return { verts, faces };
}

function subdivide(verts: V3[], faces: [number, number, number][]) {
  const out: V3[] = [...verts];
  const cache = new Map<string, number>();
  const mid = (a: number, b: number) => {
    const k = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (cache.has(k)) return cache.get(k)!;
    const va = verts[a], vb = verts[b];
    const mx = (va[0] + vb[0]) / 2;
    const my = (va[1] + vb[1]) / 2;
    const mz = (va[2] + vb[2]) / 2;
    const l = Math.sqrt(mx * mx + my * my + mz * mz);
    out.push([mx / l, my / l, mz / l]);
    const idx = out.length - 1;
    cache.set(k, idx);
    return idx;
  };
  const newFaces: [number, number, number][] = [];
  faces.forEach(([a, b, c]) => {
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  });
  return { verts: out, faces: newFaces };
}

function extractEdges(faces: [number, number, number][]) {
  const set = new Set<string>();
  const edges: [number, number][] = [];
  faces.forEach(([a, b, c]) => {
    for (const [u, v] of [[a, b], [b, c], [c, a]] as [number, number][]) {
      const k = u < v ? `${u}-${v}` : `${v}-${u}`;
      if (!set.has(k)) {
        set.add(k);
        edges.push([u, v]);
      }
    }
  });
  return edges;
}

function fibonacciSphere(n: number): V3[] {
  const points: V3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

export default function Skills() {
  const sphere = useMemo(() => {
    const ico = buildIcosahedron();
    const { verts, faces } = subdivide(ico.verts, ico.faces);
    return { verts, edges: extractEdges(faces) };
  }, []);
  const skillPoints = useMemo(() => fibonacciSphere(skills.length), []);

  const sphereRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragZoneRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<SVGSVGElement | null>(null);
  const [radius, setRadius] = useState(RADIUS_MAX);
  const radiusRef = useRef(RADIUS_MAX);
  useEffect(() => {
    const update = () => {
      const r = pickRadius(window.innerWidth);
      radiusRef.current = r;
      setRadius(r);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const rot = useRef({ x: -8, y: 0 });
  const idleSpin = useRef(0.04);
  const drag = useRef<{
    active: boolean;
    sx: number;
    sy: number;
    rx: number;
    ry: number;
  }>({ active: false, sx: 0, sy: 0, rx: 0, ry: 0 });
  const mouse = useRef({ active: false, x: 0, y: 0 });
  const hoverRef = useRef<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const setHoverIfChanged = (name: string | null) => {
    if (hoverRef.current === name) return;
    hoverRef.current = name;
    setHover(name);
  };

  useEffect(() => {
    let raf = 0;
    let visible = true;

    const stage = stageRef.current;
    let io: IntersectionObserver | null = null;
    if (stage) {
      io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? false;
        },
        { threshold: 0 },
      );
      io.observe(stage);
    }

    // pre-create SVG line elements
    const svg = linesRef.current;
    const lineEls: SVGLineElement[] = [];
    if (svg) {
      svg.innerHTML = "";
      const ns = "http://www.w3.org/2000/svg";
      sphere.edges.forEach(() => {
        const ln = document.createElementNS(ns, "line");
        ln.setAttribute("stroke", "rgba(254,110,0,0.5)");
        ln.setAttribute("stroke-width", "0.7");
        ln.setAttribute("stroke-linecap", "round");
        svg.appendChild(ln);
        lineEls.push(ln);
      });
    }


    const loop = () => {
      const RADIUS = radiusRef.current;
      if (!visible) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (!drag.current.active) {
        rot.current.y += idleSpin.current;
      }
      const rx = (rot.current.x * Math.PI) / 180;
      const ry = (rot.current.y * Math.PI) / 180;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      const project = (p: V3): { x: number; y: number; z: number } => {
        const x0 = p[0] * RADIUS;
        const y0 = p[1] * RADIUS;
        const z0 = p[2] * RADIUS;
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;
        return { x: x1, y: y2, z: z2 };
      };

      // wireframe
      sphere.edges.forEach((e, i) => {
        const a = project(sphere.verts[e[0]]);
        const b = project(sphere.verts[e[1]]);
        const ln = lineEls[i];
        if (!ln) return;
        ln.setAttribute("x1", a.x.toFixed(2));
        ln.setAttribute("y1", a.y.toFixed(2));
        ln.setAttribute("x2", b.x.toFixed(2));
        ln.setAttribute("y2", b.y.toFixed(2));
        const avgZ = (a.z + b.z) / 2;
        const depth = (avgZ + RADIUS) / (2 * RADIUS);
        const op = 0.05 + depth * 0.55;
        const w = 0.4 + depth * 0.9;
        ln.setAttribute("stroke", `rgba(254,110,0,${op.toFixed(3)})`);
        ln.setAttribute("stroke-width", w.toFixed(2));
      });


      // skill nodes
      const el = sphereRef.current;
      if (el) {
        el.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      }
      const nodes = el?.querySelectorAll<HTMLElement>("[data-skill-node]");
      const wantHover = mouse.current.active && !drag.current.active;
      let nearest: { name: string; d: number } | null = null;
      nodes?.forEach((node) => {
        const x = parseFloat(node.dataset.x || "0");
        const y = parseFloat(node.dataset.y || "0");
        const z = parseFloat(node.dataset.z || "0");
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const z2 = y * sinX + z1 * cosX;
        node.style.transform = `${node.dataset.translate} rotateY(${-rot.current.y}deg) rotateX(${-rot.current.x}deg)`;
        const depth = (z2 + RADIUS) / (2 * RADIUS);
        const opacity = 0.2 + depth * 0.8;
        const scale = 0.7 + depth * 0.45;
        node.style.opacity = String(opacity);
        node.style.zIndex = String(Math.round(depth * 1000));
        const inner = node.firstElementChild as HTMLElement | null;
        if (inner) inner.style.setProperty("--depth-scale", scale.toFixed(3));
        void x1;

        if (wantHover && depth > 0.4 && inner) {
          const r = inner.getBoundingClientRect();
          const px = mouse.current.x;
          const py = mouse.current.y;
          const pad = 8;
          if (
            px >= r.left - pad &&
            px <= r.right + pad &&
            py >= r.top - pad &&
            py <= r.bottom + pad
          ) {
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const d = Math.hypot(px - cx, py - cy);
            if (!nearest || d < nearest.d) {
              nearest = { name: node.dataset.skillName || "", d };
            }
          }
        }
      });
      if (wantHover) {
        setHoverIfChanged(nearest ? (nearest as { name: string; d: number }).name : null);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [sphere]);

  useEffect(() => {
    const dragZone = dragZoneRef.current;
    const pill = pillRef.current;
    if (!dragZone) return;

    const handles: HTMLElement[] = [dragZone];
    if (pill) handles.push(pill);

    const onDown = (e: PointerEvent) => {
      const target = e.currentTarget as HTMLElement;
      drag.current.active = true;
      drag.current.sx = e.clientX;
      drag.current.sy = e.clientY;
      drag.current.rx = rot.current.x;
      drag.current.ry = rot.current.y;
      target.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (drag.current.active) {
        const dx = e.clientX - drag.current.sx;
        const dy = e.clientY - drag.current.sy;
        rot.current.y = drag.current.ry + dx * 0.4;
        rot.current.x = drag.current.rx - dy * 0.4;
        return;
      }
      if (e.pointerType !== "mouse") return;
      mouse.current.active = true;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      const target = e.currentTarget as HTMLElement;
      drag.current.active = false;
      try {
        target.releasePointerCapture(e.pointerId);
      } catch {}
    };
    const onLeave = () => {
      drag.current.active = false;
      mouse.current.active = false;
      setHoverIfChanged(null);
    };

    handles.forEach((h) => {
      h.addEventListener("pointerdown", onDown);
      h.addEventListener("pointermove", onMove);
      h.addEventListener("pointerup", onUp);
      h.addEventListener("pointercancel", onUp);
      h.addEventListener("pointerleave", onLeave);
    });
    return () => {
      handles.forEach((h) => {
        h.removeEventListener("pointerdown", onDown);
        h.removeEventListener("pointermove", onMove);
        h.removeEventListener("pointerup", onUp);
        h.removeEventListener("pointercancel", onUp);
        h.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:py-20 md:py-28 lg:py-36 overflow-x-clip"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(48,128,255,0.05), transparent 60%)",
      }}
    >
      <SectionHeader hash="#" title="Skills.json" />

      <div
        ref={stageRef}
        className="relative w-full h-[420px] sm:h-[490px] md:h-[560px] lg:h-[660px] xl:h-[780px] mt-8 sm:mt-8 select-none"
        style={{ perspective: "1200px" }}
      >
        <svg
          aria-hidden
          ref={linesRef}
          className="absolute pointer-events-none"
          width={radius * 2 + 80}
          height={radius * 2 + 80}
          viewBox={`-${radius + 40} -${radius + 40} ${radius * 2 + 80} ${radius * 2 + 80}`}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />


        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: radius * 2,
            height: radius * 2,
            background:
              "radial-gradient(circle, rgba(254,110,0,0.18), rgba(254,110,0,0.04) 55%, transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={sphereRef}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              width: 0,
              height: 0,
              willChange: "transform",
            }}
          >
            {skills.map((s, i) => {
              const p = skillPoints[i];
              const x = Math.round(p[0] * radius * 100) / 100;
              const y = Math.round(p[1] * radius * 100) / 100;
              const z = Math.round(p[2] * radius * 100) / 100;
              const translate = `translate3d(${x}px, ${y}px, ${z}px)`;
              const isHover = hover === s.name;
              const iconSize = Math.max(22, Math.round(radius * 0.135));
              return (
                <div
                  key={s.name}
                  data-skill-node
                  data-skill-name={s.name}
                  data-translate={translate}
                  data-x={x}
                  data-y={y}
                  data-z={z}
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{
                    transform: translate,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className="relative flex flex-col items-center gap-1.5 transition-transform"
                    style={{
                      transform: `translate(-50%, -50%) scale(${isHover ? 1.3 : "var(--depth-scale, 1)"})`,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width={iconSize}
                      height={iconSize}
                      fill={s.color}
                      style={{
                        filter: isHover
                          ? `drop-shadow(0 0 10px ${s.color}) drop-shadow(0 0 4px ${s.color})`
                          : `drop-shadow(0 0 4px ${s.color}80)`,
                      }}
                    >
                      <g
                        transform={
                          s.scale
                            ? `translate(12 12) scale(${s.scale}) translate(-12 -12)`
                            : undefined
                        }
                      >
                        <path d={s.path} />
                      </g>
                    </svg>
                    <span
                      className="text-[10px] font-mono whitespace-nowrap"
                      style={{
                        color: isHover ? s.color : "rgba(230,237,243,0.75)",
                        textShadow: isHover ? `0 0 8px ${s.color}` : undefined,
                      }}
                    >
                      {s.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={dragZoneRef}
          data-cursor="grab"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full touch-none cursor-grab active:cursor-grabbing"
          style={{
            width: (radius + 40) * 2,
            height: (radius + 40) * 2,
          }}
        />

        <div
          ref={pillRef}
          data-cursor="grab"
          className="glass absolute -bottom-14 sm:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-[var(--muted)] text-xs font-mono touch-none cursor-grab active:cursor-grabbing select-none"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
          </svg>
          Drag to explore skills universe
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  siAngular,
  siApachekafka,
  siCircleci,
  siExpress,
  siFlask,
  siGit,
  siGraphql,
  siJavascript,
  siJest,
  siLangchain,
  siMongodb,
  siMysql,
  siNestjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRedux,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siWebpack,
} from "simple-icons";

type Icon = { path: string; color: string; scale?: number };

const REGISTRY: Record<string, Icon> = {
  javascript: { path: siJavascript.path, color: "#" + siJavascript.hex },
  typescript: { path: siTypescript.path, color: "#" + siTypescript.hex },
  react: { path: siReact.path, color: "#" + siReact.hex },
  "node.js": { path: siNodedotjs.path, color: "#" + siNodedotjs.hex },
  nodejs: { path: siNodedotjs.path, color: "#" + siNodedotjs.hex },
  angular: { path: siAngular.path, color: "#dd0031" },
  python: { path: siPython.path, color: "#" + siPython.hex },
  express: { path: siExpress.path, color: "#e6edf3", scale: 0.6 },
  nestjs: { path: siNestjs.path, color: "#" + siNestjs.hex },
  redux: { path: siRedux.path, color: "#" + siRedux.hex },
  graphql: { path: siGraphql.path, color: "#" + siGraphql.hex },
  tailwind: { path: siTailwindcss.path, color: "#" + siTailwindcss.hex },
  flask: { path: siFlask.path, color: "#" + siFlask.hex },
  postgresql: { path: siPostgresql.path, color: "#" + siPostgresql.hex },
  mongodb: { path: siMongodb.path, color: "#" + siMongodb.hex },
  mysql: { path: siMysql.path, color: "#" + siMysql.hex },
  kafka: { path: siApachekafka.path, color: "#e6edf3" },
  redis: { path: siRedis.path, color: "#" + siRedis.hex },
  langchain: { path: siLangchain.path, color: "#" + siLangchain.hex },
  circleci: { path: siCircleci.path, color: "#e6edf3" },
  jest: { path: siJest.path, color: "#" + siJest.hex },
  git: { path: siGit.path, color: "#" + siGit.hex },
  nginx: { path: siNginx.path, color: "#" + siNginx.hex },
  webpack: { path: siWebpack.path, color: "#" + siWebpack.hex },
  "socket.io": { path: siSocketdotio.path, color: "#e6edf3" },
  socketio: { path: siSocketdotio.path, color: "#e6edf3" },
  // hand-rolled
  aws: {
    path:
      "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963zM3.16 11.385c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.295.838.295zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607zm1.094-1.252c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.398.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.030-2.57.694-2.995z",
    color: "#ff9900",
  },
  openai: {
    path:
      "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
    color: "#10a37f",
  },
};

export default function TechIcon({
  name,
  size = 12,
}: {
  name: string;
  size?: number;
}) {
  const key = name.toLowerCase().replace(/\s+/g, "");
  const icon = REGISTRY[key];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={icon.color}
      style={{ filter: `drop-shadow(0 0 3px ${icon.color}50)` }}
      aria-hidden
    >
      <g
        transform={
          icon.scale
            ? `translate(12 12) scale(${icon.scale}) translate(-12 -12)`
            : undefined
        }
      >
        <path d={icon.path} />
      </g>
    </svg>
  );
}

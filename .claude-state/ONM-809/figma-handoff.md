# HANDOFF — TASK-002 Figma moodboard (далолатнома референслар)

## Holat: plagин reload kutilmoqda (manifest yangilandi)

## Infra (ishlab turibdi)
- talk-to-figma WebSocket relay: port 3055 (bun socket.js, background).
- Lokal rasm server: `python3 /tmp/imgserve.py <dir>` → `localhost:8765` (dual-stack ::/IPv4).
  Dir: `.claude-state/ONM-809/ARTIFACTS/mobbin/` (01..19 *.webp).
- Figma: page `0:1`, board frame `1:2` ("Далолатнома — UI референслар"), test rect `1:3` (Stake).
- Channel (oldingi): `tu4yjvzu` — reload'dan keyin yangi bo'lishi mumkin.

## Manifest o'zgarishi (backup .bak bilan)
6 ta `src/claude_mcp_plugin/manifest.json` nusxasi: `allowedDomains: ["*"]`,
`devAllowedDomains` ga `http://localhost:8765` qo'shildi. Sabab: plagin lokal serverdan
rasm fetch qila olishi uchun (avval faqat google.com + localhost:3055 ruxsat edi).
Loyiha-lokal: `online-mahalla-dashboard/claude-talk-to-figma-mcp/src/claude_mcp_plugin/manifest.json`.

## Keyingi qadam (reload'dan keyin)
1. join_channel (yangi kanal).
2. set_image_fill test (rect 1:3, url=http://localhost:8765/01-stake-wizard.webp) — domen xatosi yo'qligini tasdiqlash.
3. Moodboard qurish: 5 kategoriya qatori, har ekran 280×600 rect + app label.
   Layout: board pad 80; card pitch 320 (280+40 gap); 4 card/row; image url=localhost:8765/NN-*.webp.
   Mapping: `.claude-state/ONM-809/figma-references.md`.

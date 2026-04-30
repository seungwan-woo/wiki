---
type: guide
title: Publish 테스트 문서
tags: [test, publish]
---

# Publish 테스트 문서

이 문서는 `/home/wsw/wiki/public/test-publish.md`에 있는 임시 테스트 문서입니다.

목적은 다음을 검증하는 것입니다.

1. `/home/wsw/wiki/public` 하위 문서만 VitePress build 대상이 된다.
2. `/home/wsw/wiki` 루트의 `SCHEMA.md`, `log.md` 같은 내부 문서는 publish되지 않는다.
3. GitHub Pages URL에서 공개 문서가 정상 표시된다.

## 확인 URL

배포 후 아래 경로에서 확인할 수 있습니다.

- `https://seungwan-woo.github.io/wiki/test-publish`

## 참고자료

- [VitePress Routing](https://vitepress.dev/guide/routing)
- [GitHub Pages](https://docs.github.com/en/pages)

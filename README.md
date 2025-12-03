# 유튜브 떡상 대본 제조기 (Viral Script Maker)

성공한 유튜브 영상의 대본을 분석하여 새로운 주제에 맞는 떡상 대본을 자동으로 생성해주는 AI 도구입니다.

## 🚀 시작하기

**필수 요구사항:**
- Node.js (v18 이상)
- Gemini API 키

## 📦 설치 및 실행

1. **의존성 패키지 설치:**
   ```bash
   npm install
   ```

2. **API 키 설정:**
   - [Google AI Studio](https://aistudio.google.com/app/apikey)에서 Gemini API 키를 발급받으세요
   - `.env.local` 파일을 열어 다음과 같이 설정하세요:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **개발 서버 실행:**
   ```bash
   npm run dev
   ```
   
4. **브라우저에서 확인:**
   - http://localhost:3000 에 접속하세요

## ⚠️ 주의사항

- API 키를 설정하지 않으면 "API key not valid" 오류가 발생합니다
- `.env.local` 파일은 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)

## 🛠️ 기술 스택

- React + TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI

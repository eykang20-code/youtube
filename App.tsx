import React, { useState } from 'react';
import { Sparkles, Youtube, FileText, ArrowRight, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { generateViralScript } from './services/geminiService';
import { ScriptAnalysisResult, LoadingState } from './types';
import { Card, Button, TextArea, Input } from './components/LayoutComponents';

const App: React.FC = () => {
  const [originalTranscript, setOriginalTranscript] = useState<string>('');
  const [newTopic, setNewTopic] = useState<string>('');
  const [result, setResult] = useState<ScriptAnalysisResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!originalTranscript.trim() || !newTopic.trim()) {
      setErrorMsg('원본 대본과 새로운 주제를 모두 입력해주세요.');
      return;
    }

    setLoadingState(LoadingState.LOADING);
    setErrorMsg('');
    setResult(null);

    try {
      const data = await generateViralScript(originalTranscript, newTopic);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('알 수 없는 오류가 발생했습니다.');
      }
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleCopy = () => {
    if (result?.script) {
      navigator.clipboard.writeText(result.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              유튜브 떡상 대본 제조기
            </h1>
          </div>
          <div className="text-sm text-slate-400 hidden sm:block">
            성공 공식을 내 주제에 적용하세요
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-6">
            <section>
              <h2 className="text-2xl font-bold mb-1 flex items-center gap-2 text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-sm border border-slate-700">1</span>
                입력하기
              </h2>
              <p className="text-slate-400 mb-6 ml-10 text-sm">참고하고 싶은 영상의 대본과 새로 만들고 싶은 주제를 입력하세요.</p>
              
              <Card title="원본 대본 (레퍼런스)" icon={<FileText size={18}/>} className="h-96">
                <TextArea 
                  label="유튜브 자막 복붙" 
                  placeholder="예: 여러분 안녕하세요! 오늘은 제가 정말 충격적인 사실을 알게 되어서 이렇게 카메라를 켰습니다. 바로..."
                  value={originalTranscript}
                  onChange={(e) => setOriginalTranscript(e.target.value)}
                  className="h-full min-h-[200px]"
                />
              </Card>
            </section>

            <section>
              <Card title="새로운 주제" icon={<Sparkles size={18}/>} className="bg-gradient-to-br from-slate-800 to-slate-800/50">
                <Input 
                  label="어떤 주제로 만들까요?" 
                  placeholder="예: 초보자도 할 수 있는 스마트스토어 창업 꿀팁"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') handleGenerate();
                  }}
                />
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={loadingState === LoadingState.LOADING}
                    className="w-full sm:w-auto"
                  >
                    {loadingState === LoadingState.LOADING ? (
                      <>
                        <RefreshCw className="animate-spin w-4 h-4" />
                        분석 및 생성 중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        대본 새로 만들기
                      </>
                    )}
                  </Button>
                </div>
                {errorMsg && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2 text-red-400 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </Card>
            </section>
          </div>

          {/* Right Column: Outputs */}
          <div className="flex flex-col h-full gap-6">
             <h2 className="text-2xl font-bold mb-1 flex items-center gap-2 text-white lg:opacity-100 opacity-100">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-sm border border-slate-700">2</span>
                결과 확인
              </h2>
             <p className="text-slate-400 mb-6 ml-10 text-sm">성공 요인 분석과 새로운 대본을 확인하세요.</p>

            {loadingState === LoadingState.IDLE && (
               <div className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/30 min-h-[400px]">
                 <div className="text-center p-6">
                   <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                     <ArrowRight className="text-slate-500" size={24} />
                   </div>
                   <h3 className="text-lg font-medium text-slate-300">준비 완료</h3>
                   <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
                     왼쪽에서 내용을 입력하고 버튼을 누르면<br/>AI가 떡상 대본을 만들어드립니다.
                   </p>
                 </div>
               </div>
            )}

            {loadingState === LoadingState.LOADING && (
               <div className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/30 min-h-[400px]">
                  <div className="text-center">
                    <div className="inline-block relative w-20 h-20">
                       <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/30 rounded-full"></div>
                       <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-indigo-400 font-medium animate-pulse">
                      대본의 성공 비결을 훔치는 중...
                    </p>
                    <p className="text-slate-500 text-xs mt-2">Gemini AI가 열심히 분석하고 있습니다.</p>
                  </div>
               </div>
            )}

            {loadingState === LoadingState.SUCCESS && result && (
              <>
                <Card title="성공 요인 분석" className="border-indigo-500/30 shadow-indigo-500/10 min-h-fit">
                  <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {result.analysis}
                  </div>
                </Card>

                <Card 
                  title="NEW 대본" 
                  className="flex-grow border-indigo-500 shadow-indigo-500/20"
                  action={
                    <Button 
                      variant="secondary" 
                      onClick={handleCopy} 
                      className="!py-1 !px-3 !text-xs"
                    >
                      {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>}
                      {copied ? "복사됨" : "대본 복사"}
                    </Button>
                  }
                >
                  <div className="h-full max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                     <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white max-w-none whitespace-pre-wrap font-medium">
                      {result.script}
                     </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 mt-8 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-xs">
          <p>© 2024 Viral Script Maker. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
const STREAM_URL =
  "https://php.freestyleridesx.lol/channel/SkySportsF1%5BUK%5D";

function F1Stream() {
  return (
    <main className="stream-page">
      <iframe
        className="stream-frame"
        src={STREAM_URL}
        title="Sky Sports F1 UK"
        allow="autoplay; fullscreen"
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer"
        sandbox="allow-same-origin allow-scripts allow-presentation"
      />
    </main>
  );
}

export default F1Stream;

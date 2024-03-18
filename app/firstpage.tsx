import React from 'react';

// SVG画像のURL
const svgImageUrl = 'https://example.com/your-svg-image.svg';

const Page = () => {
    return (
        <div>
            {/* SVG画像 */}
            <img src={svgImageUrl} alt="特定のSVG写真" />

            {/* テキスト */}
            <p style={{ fontSize: '16px', color: '#333' }}>この度は・・・誠にありがとうございます。</p>

            {/* ボタン */}
            <button style={{ backgroundColor: '#008080', color: '#fff', padding: '10px 20px', fontSize: '18px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                暮らしのアドバイスをゲット！
            </button>
        </div>
    );
};

export default Page;

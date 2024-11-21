import Document, { 
  DocumentContext, 
  Html, 
  Head, 
  Main, 
  NextScript,
  DocumentInitialProps 
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import styled from 'styled-components'

// 创建样式化组件
const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;

  &:focus {
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    padding: 20px;
    background: #FFFFFF;
    z-index: 9999;
  }
`

const NoScriptWarning = styled.div`
  padding: 20px;
  margin: 20px;
  text-align: center;
  background-color: #FEF2F2;
  color: #991B1B;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 10px;
  }
`

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          sheet.getStyleElement()
        ],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          {/* 基础元数据优化 */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0F172A" />
          <meta name="description" content="Your site description" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="color-scheme" content="light dark" />
          
          {/* DNS 预获取和资源预连接 */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://api.your-domain.com" />
          
          {/* PWA 增强 */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="application-name" content="Your App Name" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Your App Name" />
          <meta name="mobile-web-app-capable" content="yes" />
          
          {/* PWA 图标优化 */}
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2563EB" />
          <meta name="msapplication-TileColor" content="#2563EB" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          
          {/* 性能优化：预加载关键资源 */}
          <link 
            rel="preload" 
            href="/fonts/inter-var.woff2" 
            as="font" 
            type="font/woff2" 
            crossOrigin="anonymous" 
          />
          
          {/* SEO 优化：添加结构化数据 */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Your Site Name",
                "url": "https://your-domain.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://your-domain.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
          
          {/* 安全性增强：CSP 策略优化 */}
          <meta
            httpEquiv="Content-Security-Policy"
            content={`
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https: blob:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://api.your-domain.com https://www.google-analytics.com;
              frame-src 'self';
              media-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()}
          />
          
          {/* 安全头部 */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          
          {/* 性能优化：资源提示 */}
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        </Head>
        <body>
          {/* 使用样式化组件替代内联样式 */}
          <SkipLink href="#main-content">
            跳转到主要内容
          </SkipLink>

          <noscript>
            <NoScriptWarning role="alert">
              <h2>需要启用 JavaScript</h2>
              <p>
                很抱歉，本网站需要 JavaScript 才能正常运行。
                请在浏览器设置中启用 JavaScript 以获得最佳体验。
              </p>
            </NoScriptWarning>
          </noscript>
          
          <div id="main-content" role="main" tabIndex={-1}>
            <Main />
          </div>
          
          <div id="portal-root" />
          
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
import type { FC } from 'hono/jsx'

function generateSessionId() {
  return crypto.randomUUID()
}

export const Layout: FC = () => {
  return (
    <>
      <head>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <title>Vanilla Hono</title>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css'
        />
        <script
          src='https://kit.fontawesome.com/c2b6fd3803.js'
          crossorigin='anonymous'
        >
        </script>

        <script type='module' src='https://cdn.jsdelivr.net/gh/starfederation/datastar@1.0.0-RC.7/bundles/datastar.js'>
        </script>
        <style>
          {`
                        ul.no-bullets {
                        list-style-type: none;
                        }

                        .xspinner {
                        padding: 5.5em;
                        height: 12em;
                        }

                        .footer {
                            --bulma-footer-padding: 3rem 1.5rem 3rem;
                        }

                `}
        </style>
      </head>

      <body>
        <section class='section'>
          <div class='container'>
            <h1 class='title'>
              Vanilla Hono
            </h1>
            <p class='subtitle'>
              Hono, Bulma, Datastar Starter
            </p>
            <div data-on-datastar-fetch="$_fetchError = evt.detail.type === 'retrying' || evt.detail.type === 'retry-failed'">
            </div>
            <div
              class='box error-message'
              data-show='$_fetchError'
              style='position: fixed; bottom: 0em; left: 0em; padding: 1em; z-index: 1000; display: none;'
            >
              <p class='has-text-danger is-size-4'>
                Network issues. Please try again later.
              </p>
            </div>
            <div data-signals={`{sessionId: '${generateSessionId()}'}`}></div>
            <div class='columns'>
              <div class='column'>
                <div class='content'>
                  Put some stuff here
                </div>
              </div>
            </div>
            <footer class='footer'>
              <div id='site-error'></div>
              <div class='content has-text-centered'>
                <strong>
                  <a
                    href='https://sliplane.io'
                    target='_blank'
                  >
                    Sliplane
                  </a>
                  {' '}
                </strong>
                and
                <strong>
                  {' '}
                  <a href='https://hono.dev' target='_blank'>
                    Hono
                  </a>
                </strong>{' '}
                backend,
                <br />
                <strong>
                  <a
                    href='https://data-star.dev/'
                    target='_blank'
                  >
                    DataStar
                  </a>{' '}
                </strong>
                &
                <strong>{' '}
                  <a href='https://bulma.io/' target='_blank'>
                    Bulma
                  </a>{' '}
                </strong>
                &{' '}
                <strong>
                  <a href='https://fontawesome.com'>
                    Font Awesome
                  </a>{' '}
                </strong>
                frontend
              </div>
            </footer>
          </div>
        </section>
      </body>
    </>
  )
}

import {Platform, StyleSheet, View} from "react-native";
import {WebView} from "react-native-webview";
import React from "react";

function addLineBreaks(inputString) {
    let escapedString = inputString.replace(/(\\[^a-zA-Z0-9\[\]])/g, '<<BACKSLASH>>$1');
    let result = escapedString.split('\n').join('<br>');

    result = result.replace(/<<BACKSLASH>>/g, '\\');
    return result;
}

function convertReactStyleToCSS(style, tag) {
    let css = `${tag} { `;

    // Map React Native style properties to CSS properties
    const stylesWithPX = ['font-size', 'margin', 'padding']
    const styleMap = {
        fontSize: 'font-size',
        fontWeight: 'font-weight',
        fontStyle: 'font-style',
        color: 'color',
        backgroundColor: 'background-color',
        textAlign: 'text-align',
        lineHeight: 'line-height',
        letterSpacing: 'letter-spacing',
        fontFamily: 'font-family',
        padding: 'padding',
        margin: 'margin'
    };

    for (const [key, value] of Object.entries(style)) {
        if (styleMap[key]) {
            if (stylesWithPX.includes(styleMap[key])) {
                if (styleMap[key] === "font-size") {
                    css += `${styleMap[key]}: ${value * 4}px; `;
                }
                else
                    css += `${styleMap[key]}: ${value}px; `;
            } else if (styleMap[key] === "font-family")
                css += `${styleMap[key]}: '${value}'; `;
            else
                css += `${styleMap[key]}: ${value}; `;
        }
    }

    css += '}';
    return css;
}

export default function WebTextDisplay({input, textStyle, bodyStyle}) {
    const isWeb = Platform.OS === 'web';

    const mathJaxHTML = `
    <!DOCTYPE html>
    <html>
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>
        <script type="text/x-mathjax-config">
          MathJax.Hub.Config({
            tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] },
            "HTML-CSS": { scale: 90, linebreaks: { automatic: true, width: "container" } },
            SVG: { linebreaks: { automatic: true, width: "container" } }
          });
          
        </script>
        <style>
        html, body {
          overflow: hidden;
          width: 98vw;
          height: 100%;
          margin: 0;
          padding: 0;
          pointer-events: none;
          white-space: pre-wrap;
        }
        
        ${convertReactStyleToCSS(bodyStyle, 'body')}
        ${convertReactStyleToCSS(textStyle, 'p')}
        </style>
      </head>
      <body>
        <p> ${addLineBreaks(input)} </p>
      </body>
    </html>
  `;

    return (
        <View style={styles.container}>
            {isWeb ? (
                <iframe
                    srcDoc={mathJaxHTML}
                    style={styles.webview}
                />
            ) : (
                <WebView
                    originWhitelist={['*']}
                    source={{ html: mathJaxHTML }}
                    style={styles.webview}
                    scrollEnabled={false}
                    nestedScrollEnabled={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        pointerEvents: 'none',
    },
    webview: {
        flex: 1,
        overflow: 'hidden'
    },
});

!function(){function e(e,t){var n=o.createShader(e);return o.shaderSource(n,t),o.compileShader(n),o.getShaderParameter(n,o.COMPILE_STATUS)||console.error(o.getShaderInfoLog(n)),n}function t(){if(o){var e=o.drawingBufferWidth,n=o.drawingBufferHeight,r=(Date.now()-d)/1e3;o.viewport(0,0,e,n),o.uniform2f(s,e,n),o.uniform1f(c,r),o.drawArrays(o.TRIANGLES,0,3),requestAnimationFrame(t)}}try{var n=document.body.appendChild(document.createElement("canvas")),o=n.getContext("webgl")||n.getContext("webgl-experimental")||n.getContext("experimental-webgl"),r=document.body.appendChild(document.createElement("div"));if(!o)throw new Error("WebGL support is unavailable or disabled! :(");if(!o.getExtension("OES_texture_float"))throw new Error("Missing extension: OES_texture_float")}catch(e){return console.error(e.message),ga("_trackEvent","Error","Intro Page",e.message),document.body.setAttribute("class","no-webgl"),void(document.body.innerHTML+=["~div class='unpm-fail'>","~h1>Sadly, it looks like this visualisation won't work on this device~/h1>","~p>Try viewing the site on another browser or device. ","We recommend using Chrome or Firefox on a laptop or desktop computer for the best possible experience.~/p>","~/div>"].join("").replace(/\~/g,String.fromCharCode(60)))}r.setAttribute("class","progress-percent"),r.innerHTML="0%";var i=e(o.VERTEX_SHADER,"\nprecision mediump float;\nattribute vec2 position;\nvoid main() {\n  gl_Position = vec4(position, 1, 1);\n}\n"),a=e(o.FRAGMENT_SHADER,"\nprecision mediump float;\nuniform float iGlobalTime;\nuniform vec2  iResolution;\n\n#define PI 3.14159265359\n\nfloat map(vec2 p, float t, float channel) {\n  float g = pow(sin(t * 1.25) * .5 + .5, 4.0);\n  p.x += smoothstep(0.15, 1.0, g) * channel * 0.05;\n  p.y += smoothstep(0.15, 1.0, g) * channel * 0.05;\n\n  float radius = 0.03125;\n  float d      = 9999.99;\n  float sharp  = mix(80.0, 12.0, g);\n\n  for (int i = 0; i < 10; i++) {\n    float I = float(i);\n    float a = PI * 0.2 * I + t;\n    vec2  o = vec2(sin(a), cos(a)) * (0.25 + 0.06125 * (sin(a * 5.0) + 1.0));\n    float circle = length(p + o) - radius;\n    d = min(d, circle);\n  }\n\n  return pow(1.0 - d, sharp);\n}\n\nvoid main() {\n  vec2 uv  = 2. * gl_FragCoord.xy / iResolution - 1.;\n  vec3 col = vec3(0.0);\n\n  for (int i = 0; i < 3; i++) {\n    col[i] = map(uv, iGlobalTime, float(i) - 1.0);\n  }\n\n  col += vec3(0.12941,0.07058,0.18431);\n\n  gl_FragColor = vec4(col, 1);\n}\n"),l=o.createProgram();o.attachShader(l,i),o.attachShader(l,a),o.bindAttribLocation(l,0,"position"),o.linkProgram(l),o.getProgramParameter(l,o.LINK_STATUS)||console.error(o.getProgramInfoLog(l)),o.useProgram(l),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE);var s=o.getUniformLocation(l,"iResolution"),c=o.getUniformLocation(l,"iGlobalTime"),d=Date.now(),u=o.createBuffer(),m=new Float32Array([-1,-1,-1,4,4,-1]);o.bindBuffer(o.ARRAY_BUFFER,u),o.bufferData(o.ARRAY_BUFFER,m,o.DYNAMIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0),t(),document.body.style.background="#21122F",n.width=256,n.height=256,n.style.position="absolute",n.style.left="50%",n.style.top="50%",n.style.transform="translate(-50%, -50%) scale(0.5)",n.style.transition="opacity 0.5s",n.style.opacity=1,window.addEventListener("unpm:progress",function(e){r.innerHTML=Math.round(100*e.count/e.total)+"%"},!1),window.addEventListener("unpm:ready",function(e){n.style.opacity=0,r.style.opacity=0,setTimeout(function(){n.parentNode.removeChild(n),r.parentNode.removeChild(r),o.deleteProgram(l),o.deleteShader(i),o.deleteShader(a),o.deleteBuffer(u),t=function(){},n=null,o=null},500)}),setTimeout(function(){var e=document.createElement("script"),t=window.UNPM_BUNDLE_HASH||"";t&&(t+="."),e.setAttribute("charset","utf-8"),e.setAttribute("type","text/javascript"),e.setAttribute("src","bundle."+t+"js"),document.body.appendChild(e)})}();
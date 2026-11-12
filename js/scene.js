(function(){
var $=function(id){return document.getElementById(id)};
// Ambient cosmic scene: procedural planet, spiral galaxy, nebulae and stars.
// Keep the existing static artwork as the no-WebGL / reduced-motion fallback.
(function ambientCosmicScene(){
  var host=$('three-scene');
  if(!host||!document.body)return;
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  var connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  var mobile=window.matchMedia('(max-width:720px)').matches;
  var lowPower=window.matchMedia('(max-width:480px)').matches||(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)||(connection&&(connection.saveData||/^(slow-2g|2g)$/.test(connection.effectiveType||'')));
  if(reduced.matches||lowPower)return;
  // Reparent the existing scene host so the ambient composition can follow the reader
  // across the whole site instead of being limited to the hero section.
  host.style.cssText='position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;z-index:-1!important;opacity:.34!important;mix-blend-mode:screen!important;pointer-events:none!important;overflow:hidden!important;display:block!important';
  document.body.appendChild(host);
  var loaded=false,visible=true,raf=0,renderer=null,scene=null,camera=null,clock=null,starGeo=null,starMat=null,galaxyGeo=null,galaxyMat=null,planet=null,planetMat=null,atmosphere=null,nebulae=[],resizeObserver=null,nebulaTexture=null,cleaned=false;
  function onReaderToggle(e){if(e.detail&&e.detail.open)stopFrame();else schedule();}
  function onReducedMotionChange(e){if(e.matches){cleanup();fallback();}}
  function load(){
    if(loaded||document.hidden)return;
    loaded=true;
    var script=document.createElement('script');
    script.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async=true;script.onload=init;script.onerror=fallback;
    document.head.appendChild(script);
  }
  function fallback(){host.style.display='none';}
  function makeNebulaTexture(){
    var c=document.createElement('canvas');c.width=128;c.height=128;
    var x=c.getContext('2d'),g=x.createRadialGradient(64,64,2,64,64,62);
    g.addColorStop(0,'rgba(240,68,82,.34)');g.addColorStop(.34,'rgba(135,34,90,.17)');g.addColorStop(1,'rgba(40,20,70,0)');
    x.fillStyle=g;x.fillRect(0,0,128,128);
    return new THREE.CanvasTexture(c);
  }
  function init(){
    if(!window.THREE||document.hidden){fallback();return;}
    try{
      scene=new THREE.Scene();
      camera=new THREE.PerspectiveCamera(54,window.innerWidth/Math.max(1,window.innerHeight),.1,120);
      camera.position.set(0,0,12);
      renderer=new THREE.WebGLRenderer({alpha:true,antialias:!mobile,powerPreference:'low-power',failIfMajorPerformanceCaveat:true});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile?1:1.25));
      renderer.setSize(window.innerWidth,window.innerHeight);
      renderer.setClearColor(0x000000,0);
      if('outputColorSpace'in renderer)renderer.outputColorSpace=THREE.SRGBColorSpace;
      else if('outputEncoding'in renderer)renderer.outputEncoding=THREE.sRGBEncoding;
      host.appendChild(renderer.domElement);
      // Fine star field with gentle depth and drift.
      var starCount=mobile?220:650,sp=new Float32Array(starCount*3);
      for(var i=0;i<starCount;i++){sp[i*3]=(Math.random()-.5)*30;sp[i*3+1]=(Math.random()-.5)*19;sp[i*3+2]=(Math.random()-.5)*18-2;}
      starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.BufferAttribute(sp,3));
      starMat=new THREE.PointsMaterial({color:0xf5dce0,size:mobile?.035:.025,transparent:true,opacity:.62,sizeAttenuation:true,depthWrite:false});
      scene.add(new THREE.Points(starGeo,starMat));
      // A spiral galaxy built from tiny points, tinted with the site's crimson accent.
      var gc=mobile?700:1800,gp=new Float32Array(gc*3),colors=new Float32Array(gc*3);
      var arms=3;
      for(var j=0;j<gc;j++){
        var radius=Math.pow(Math.random(),.68)*3.15,arm=(j%arms)/arms*Math.PI*2;
        var angle=arm+radius*1.35+(Math.random()-.5)*.38;
        gp[j*3]=Math.cos(angle)*radius;
        gp[j*3+1]=(Math.random()-.5)*.22*(1-radius/3.4);
        gp[j*3+2]=Math.sin(angle)*radius;
        var warm=Math.random();colors[j*3]=.55+warm*.45;colors[j*3+1]=.16+warm*.13;colors[j*3+2]=.24+warm*.36;
      }
      galaxyGeo=new THREE.BufferGeometry();galaxyGeo.setAttribute('position',new THREE.BufferAttribute(gp,3));galaxyGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));
      galaxyMat=new THREE.PointsMaterial({size:mobile?.025:.018,vertexColors:true,transparent:true,opacity:.68,depthWrite:false,sizeAttenuation:true});
      var galaxy=new THREE.Points(galaxyGeo,galaxyMat);galaxy.position.set(4.3,.2,-2.2);galaxy.rotation.x=.58;scene.add(galaxy);
      // Procedural gas giant: animated surface bands, storm-like noise and dark crimson oceans.
      var sphere=new THREE.SphereGeometry(1.75,mobile?36:64,mobile?28:48);
      planetMat=new THREE.ShaderMaterial({
        uniforms:{uTime:{value:0}},
        vertexShader:'varying vec3 vNormal; varying vec3 vPos; void main(){vNormal=normalize(normalMatrix*normal);vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
        fragmentShader:'uniform float uTime; varying vec3 vNormal; varying vec3 vPos; void main(){float band=sin(vPos.y*13.0+sin(vPos.x*3.0+uTime*.08)*.8+sin(vPos.z*4.0)*.4);float cloud=sin(vPos.x*8.0+sin(vPos.z*6.0+uTime*.06))*sin(vPos.y*9.0+vPos.z*3.0);float light=max(dot(normalize(vNormal),normalize(vec3(-.55,.4,1.0))),0.0);vec3 deep=vec3(.055,.025,.055);vec3 red=vec3(.48,.095,.15);vec3 pale=vec3(.75,.38,.34);vec3 col=mix(deep,red,smoothstep(-.45,.65,band));col=mix(col,pale,smoothstep(.68,.94,band)*.36);col+=vec3(.08,.025,.06)*cloud;col*=.26+light*.95;gl_FragColor=vec4(col,1.0);}'
      });
      planet=new THREE.Mesh(sphere,planetMat);planet.position.set(-3.55,.15,-1.4);planet.rotation.z=-.23;planet.scale.setScalar(mobile?.82:1);scene.add(planet);
      var atGeo=new THREE.SphereGeometry(1.83,mobile?32:56,mobile?24:40);
      var atMat=new THREE.ShaderMaterial({vertexShader:'varying vec3 n; void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec3 n; void main(){float rim=pow(1.0-max(dot(normalize(n),vec3(0.0,0.0,1.0)),0.0),2.2);gl_FragColor=vec4(.95,.12,.23,rim*.34);}',transparent:true,blending:THREE.AdditiveBlending,side:THREE.BackSide,depthWrite:false});
      atmosphere=new THREE.Mesh(atGeo,atMat);atmosphere.position.copy(planet.position);atmosphere.scale.copy(planet.scale).multiplyScalar(1.04);scene.add(atmosphere);
      // Soft procedural nebula sprites; no extra image downloads.
      nebulaTexture=makeNebulaTexture();
      for(var n=0;n<(mobile?2:4);n++){
        var mat=new THREE.SpriteMaterial({map:nebulaTexture,color:n%2?0x643a8c:0xc72e54,transparent:true,opacity:n%2?.14:.18,depthWrite:false,blending:THREE.AdditiveBlending});
        var sprite=new THREE.Sprite(mat);sprite.position.set((n-1.4)*3.2,Math.sin(n*2.1)*2.1,-3-n*.4);sprite.scale.set(5.8,4.6,1);scene.add(sprite);nebulae.push(sprite);
      }
      clock=new THREE.Clock();
      if(!mobile)window.addEventListener('pointermove',onPointer,{passive:true});
      window.addEventListener('resize',resize,{passive:true});
      if('IntersectionObserver'in window){
        resizeObserver=new IntersectionObserver(function(entries){visible=entries.some(function(e){return e.isIntersecting});if(visible)schedule();else stopFrame();},{threshold:0});
        resizeObserver.observe(document.body);
      }
      document.addEventListener('visibilitychange',onVisibility);
      document.addEventListener('atomic:reader-toggle',onReaderToggle);
      window.addEventListener('pagehide',cleanup,{once:true});
      schedule();
    }catch(e){cleanup();fallback();}
  }
  var mx=0,my=0,tx=0,ty=0;
  function onPointer(e){mx=(e.clientX/window.innerWidth-.5)*.22;my=(e.clientY/window.innerHeight-.5)*.14;}
  function resize(){if(!renderer||!camera)return;camera.aspect=window.innerWidth/Math.max(1,window.innerHeight);camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);}
  function schedule(){if(visible&&!document.hidden&&renderer&&!raf)raf=requestAnimationFrame(frame);}
  function stopFrame(){if(raf)cancelAnimationFrame(raf);raf=0;}
  function frame(){
    raf=0;if(!visible||document.hidden||!renderer||document.body.classList.contains('reader-open'))return;
    var t=clock.getElapsedTime();tx+=(mx-tx)*.018;ty+=(my-ty)*.018;
    planet.rotation.y=t*.035+tx;planet.rotation.x=.08+ty*.35;atmosphere.rotation.copy(planet.rotation);
    galaxyGeo&& (galaxyGeo.attributes.position.needsUpdate=false);
    scene.rotation.y=Math.sin(t*.035)*.035+tx*.25;scene.rotation.x=Math.cos(t*.027)*.018+ty*.2;
    nebulae.forEach(function(s,i){s.material.opacity=(i%2?.12:.16)+Math.sin(t*.16+i)*.025;s.position.y+=Math.sin(t*.12+i)*.0005;});
    starMat.opacity=.54+Math.sin(t*.4)*.06;planetMat.uniforms.uTime.value=t;
    renderer.render(scene,camera);raf=requestAnimationFrame(frame);
  }
  function onVisibility(){if(document.hidden||document.body.classList.contains('reader-open'))stopFrame();else schedule();}
  function cleanup(){
    if(cleaned)return;
    cleaned=true;
    stopFrame();
    if(resizeObserver){resizeObserver.disconnect();resizeObserver=null;}
    window.removeEventListener('resize',resize);
    window.removeEventListener('pointermove',onPointer);
    window.removeEventListener('pagehide',cleanup);
    document.removeEventListener('visibilitychange',onVisibility);
    document.removeEventListener('atomic:reader-toggle',onReaderToggle);
    if(reduced.removeEventListener)reduced.removeEventListener('change',onReducedMotionChange);
    if(renderer){renderer.dispose();if(renderer.domElement.parentNode)renderer.domElement.remove();}
    if(scene)scene.traverse(function(o){if(o.geometry&&o.geometry.dispose)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(function(m){if(m&&m.dispose)m.dispose();});}});
    [starGeo,starMat,galaxyGeo,galaxyMat,planetMat,nebulaTexture].forEach(function(o){if(o&&o.dispose)o.dispose();});
    renderer=null;scene=null;camera=null;clock=null;starGeo=null;starMat=null;galaxyGeo=null;galaxyMat=null;planet=null;planetMat=null;atmosphere=null;nebulae=[];
  }
  if(reduced.addEventListener)reduced.addEventListener('change',onReducedMotionChange);
  load();
})();
})();

import React, { Component } from 'react';
import rocketC4dUrl from 'static/rocket-c4d.gltf';
import Stats from 'stats.js';

import wenli from 'static/wenli.png';
import tietu from 'static/tietu.png';
import tietu2 from 'static/tietu2.png';

import './other.scss';

window.THREE = require('three');
require('three/examples/js/loaders/GLTFLoader');

// 立方体贴图
const createCubeMap = (THREE, img, opacity, color, key) => {
  const urls = [
    img, img,
    img, img,
    img, img
  ];

  const loader = new THREE.CubeTextureLoader();
  // loader.setPath(path);
  const textureCube = loader.load(urls);
  textureCube.encoding = THREE.sRGBEncoding;

  const material = new THREE[key]({
    color,
    envMap: textureCube,
    opacity,
    refractionRatio: 1.4,
  });

  return material;
};

class Rocket extends Component {
  componentDidMount() {
    this.canvasRender();
  }

  canvasRender() {
    const container = document.getElementById('rocket-three');
    const DOMData = container.getBoundingClientRect();
    const continer = document.getElementById('rocket-three');
    const stats = new Stats();

    // this.canvasViewHeight = (DOMData.top);

    const scene = new THREE.Scene();
    // 使用正交投影相机，避免近大远小
    const camera = new THREE.OrthographicCamera(DOMData.width / -2, DOMData.width / 2, DOMData.height / 2, DOMData.height / -2, 0.1, 1000);
    // 设置相机缩放因子
    camera.zoom = 1.1;
    let webGLRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    let mesh; let fire2;

    webGLRenderer.setClearColor(0xffffff, 0);
    webGLRenderer.setSize(DOMData.width, DOMData.height);
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    webGLRenderer.autoClear = false;
    webGLRenderer.shadowMapEnabled = true;

    // 设置相机位置，这里将相机放置在Z轴上，方便控制火箭
    camera.position.x = 126;
    camera.position.y = 60;
    camera.position.z = 187;
    camera.lookAt(new THREE.Vector3(126, 60, 0));
    scene.add(camera);

    // 设置聚光灯光源
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-124, -21, 441);
    spotLight.intensity = 1.3;
    scene.add(spotLight);

    const target = 10;

    const cameraspace = {
      x: 0,
      y: 0,
      z: 0,
      type: 'add',
    };

    continer.appendChild(webGLRenderer.domElement);

    const loader = new THREE.GLTFLoader();
    const textureCube3 = createCubeMap(THREE, wenli, 1, 0xffebdc, 'MeshStandardMaterial');
    const textureCube = createCubeMap(THREE, tietu, 1, 0xffffffa8, 'MeshBasicMaterial');
    const textureCube2 = createCubeMap(THREE, tietu2, 0.5, 0xffffff, 'MeshBasicMaterial');

    // 加载一个 glTF 资源
    loader.load(
      // 资源链接
      rocketC4dUrl,
      // 资源加载完成后的回调函数
      ({ scene: loadedMesh }) => {
        mesh = loadedMesh;

        textureCube2.transparent = true;

        const meshMaterial = new THREE.MeshLambertMaterial({
          color: 0xf22a32,
        });
        // 设置火箭头部为玻璃材质
        loadedMesh.children[15].material = textureCube;
        // 设置火箭体为红色金属材质
        loadedMesh.children[16].material = meshMaterial;
        loadedMesh.children[13].material = meshMaterial;
        // 设置火箭窗户为玻璃材质并设置透明
        loadedMesh.children[2].material = textureCube2;
        // 设置火箭金属质感部分并添加贴图
        [0, 1, 3, 5, 6, 7, 8, 10, 11, 14].forEach((item) => {
          loadedMesh.children[item].material = textureCube3;
        });
        // 火箭放大1.2倍到合适大小
        loadedMesh.scale.set(1.2, 1.2, 1.2);
        // 设置火箭角度
        loadedMesh.rotation.set(-1.1, -0.4, -1.1);
        scene.add(loadedMesh);

        // // 为火箭添加喷火效果
        // [
        //   [[150, 150], [-47, -22, -2]],
        //   [[70, 70], [27, 32, 53]],
        //   [[70, 70], [-19, 74, -21]],
        //   [[70, 70], [54, -41, -5]],
        // ].forEach((item, index) => {
        //   const fire = createFire(THREE, 10 + target * 10, item[0], item[1]);
        //   fire.rotateZ(2.05);
        //   fire.expansion = -0.45;
        //   scene.add(fire);
        //   if (index === 1) {
        //     fire2 = fire;
        //   }
        // });
      },
    );

    container.appendChild(stats.dom);

    const render = () => {
      if (mesh) {
        // 模型循环旋转并在X轴移动
        if (cameraspace.x < 150 && cameraspace.type === 'add') {
          cameraspace.x += 0.2;
          // fire2.position.y -= 0.05;
          mesh.rotateY(0.0016);
        } else {
          cameraspace.type = 'minus';
          cameraspace.x -= 0.2;
          // fire2.position.y += 0.05;
          mesh.rotateY(-0.0016);
          if (cameraspace.x < -150) {
            cameraspace.type = 'add';
          }
        }
      }

      webGLRenderer.render(scene, camera);
      stats.update();
      requestAnimationFrame(render);
    };

    render();
  }

  render() {
    return (
      <div className="rocket" id="rocket-three">

      </div>
    )
  }
}

export default Rocket;

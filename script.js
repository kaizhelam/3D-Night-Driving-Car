const { THREE } = window;

function isMobile() {
    let check = false;

    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    return check;
}

const IS_MOBILE_DEVICE = isMobile();

const FLAGS = Object.freeze({
    ENABLE_SHADOWS: !IS_MOBILE_DEVICE,
    ENABLE_BLOOM: !IS_MOBILE_DEVICE,
    ENABLE_NOISE: !IS_MOBILE_DEVICE
});

const COLOR_PALETTE = Object.freeze({
    black: 0x010101,
    white: 0xeeeeee,
    color1: 0xf72585,
    color2: 0xb5179e,
    color3: 0x7209b7,
    color4: 0x560bad,
    color5: 0x480ca8,
    color6: 0x3a0ca3,
    color7: 0x3f37c9,
    color8: 0x4361ee,
    color9: 0x4895ef,
    color10: 0x4cc9f0
});

const COLOR_PALETTE_GLSL = Object.freeze({
    black: "vec4(0.04, 0.04, 0.04, 1.0)",
    white: "vec4(0.933, 0.933, 0.933, 1.0)",
    color1: "vec4(0.969, 0.145, 0.522, 1.0)",
    color2: "vec4(0.71, 0.09, 0.62, 1.0)",
    color3: "vec4(0.447, 0.035, 0.718, 1.0)",
    color4: "vec4(0.337, 0.043, 0.678, 1.0)",
    color5: "vec4(0.282, 0.047, 0.659, 1.0)",
    color6: "vec4(0.227, 0.047, 0.639, 1.0)",
    color7: "vec4(0.247, 0.216, 0.788, 1.0)",
    color8: "vec4(0.263, 0.38, 0.933, 1.0)",
    color9: "vec4(0.282, 0.584, 0.937, 1.0)",
    color10: "vec4(0.298, 0.788, 0.941, 1.0)"
});

class DefaultMaterial extends THREE.MeshStandardMaterial {
    constructor() {
        super({
            color: COLOR_PALETTE.white
        });
    }
}

class CarMaterial extends THREE.MeshStandardMaterial {
    constructor() {
        super({
            color: COLOR_PALETTE.black
        });
    }
}

class LightMaterial extends THREE.MeshStandardMaterial {
    constructor() {
        super({
            color: COLOR_PALETTE.color1
        });
    }
}

class WheelMaterial extends THREE.MeshStandardMaterial {
    constructor() {
        super({
            color: COLOR_PALETTE.black
        });
    }
}

class MountainMaterial extends THREE.MeshBasicMaterial {
    constructor() {
        super({
            color: COLOR_PALETTE.black
        });
    }
}

class CustomMaterial extends THREE.MeshStandardMaterial {
    onBeforeCompile(shader) {
        shader.uniforms.uTime = { value: 0.0 };

        shader.vertexShader = shader.vertexShader.replace(
            "#include <uv_pars_vertex>",
            `varying vec2 vUv;
            uniform float uTime;`
        );

        shader.vertexShader = shader.vertexShader.replace(
            "#include <uv_vertex>",
            "vUv = uv;"
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            "varying vec3 vViewPosition;",
            `varying vec3 vViewPosition;
            varying vec2 vUv;
            uniform float uTime;`
        );

        this.userData.shader = shader;
    }
}

class CustomTransparentMaterial extends CustomMaterial {
    constructor() {
        super({
            transparent: true
        });
    }
}

class RoadMaterial extends CustomTransparentMaterial {
    onBeforeCompile(shader) {
        super.onBeforeCompile(shader);

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_fragment>",
            `
            diffuseColor = ${COLOR_PALETTE_GLSL.black};

            float width = 0.06;

            bool isInCenter = abs(0.5 - vUv.x) < (0.01 + width / 2.0);
            bool isInRoad = abs(0.5 - vUv.x) < (width / 2.0);

            if (isInCenter) {
                diffuseColor = ${COLOR_PALETTE_GLSL.color9};
            }

            if (isInRoad) {
                diffuseColor = ${COLOR_PALETTE_GLSL.black};

                diffuseColor.a = 0.8;

                bool isInLine = (abs(0.5 - vUv.x + width / 6.0) < 0.0003);
                bool isInDashedLine = (abs(0.5 - vUv.x - width / 6.0) < 0.0003)
                    && (sin(100.0 * vUv.y - 10.0 * uTime) > 0.3);

                if (isInLine || isInDashedLine) {
                    diffuseColor = ${COLOR_PALETTE_GLSL.color10};
                }
            }
            `
        );

        this.userData.shader = shader;
    }
}

class SunMaterial extends CustomTransparentMaterial {
    onBeforeCompile(shader) {
        super.onBeforeCompile(shader);

        // eslint-disable-next-line no-param-reassign
        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_fragment>",
            `
            diffuseColor = vec4(0.0);

            bool isInSun = distance(vUv.xy, vec2(0.5, 0.5)) < 0.5;

            if (isInSun) {
                diffuseColor = ${COLOR_PALETTE_GLSL.color1};

                float delta = 0.2 * (1.0 - vUv.y);

                diffuseColor += vec4(delta, delta, 0.0, 0.0);

                bool isInLine = sin(100.0 * vUv.y) * vUv.y > 0.3;

                if (isInLine) {
                    diffuseColor = ${COLOR_PALETTE_GLSL.color3};
                }
            }
            `
        );

        this.userData.shader = shader;
    }
}

class BuildingMaterialA extends CustomMaterial {
    onBeforeCompile(shader) {
        super.onBeforeCompile(shader);

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_fragment>",
            `
            diffuseColor = ${COLOR_PALETTE_GLSL.black};

            bool isInWindow = vUv.y > 0.09
                && (sin(31.415 * (vUv.x - 0.05)) > 0.5)
                && (sin(100.0 * vUv.y) > 0.5);

            if (isInWindow) {
                diffuseColor = ${COLOR_PALETTE_GLSL.color7};

                if (vUv.x > 0.4 && vUv.x < 0.6) {
                    diffuseColor = ${COLOR_PALETTE_GLSL.color10};
                }
            }
            `
        );

        this.userData.shader = shader;
    }
}

class BuildingMaterialB extends CustomMaterial {
    onBeforeCompile(shader) {
        super.onBeforeCompile(shader);

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_fragment>",
            `
            diffuseColor = ${COLOR_PALETTE_GLSL.black};

            bool isInWindow = vUv.y > 0.1
                && vUv.y < 0.5
                && (sin(50.0 * 3.1415 * (vUv.x - 0.05)) > -0.8)
                && (sin(50.0 * vUv.y) > 0.5);

            if (isInWindow) {
                diffuseColor = ${COLOR_PALETTE_GLSL.color1};

                if (vUv.y < 0.3) {
                    diffuseColor = ${COLOR_PALETTE_GLSL.color4};
                }
            }
            `
        );

        this.userData.shader = shader;
    }
}

class BuildingMaterialC extends CustomMaterial {
    onBeforeCompile(shader) {
        super.onBeforeCompile(shader);

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_fragment>",
            `
            diffuseColor = ${COLOR_PALETTE_GLSL.black};

            bool isInWindow = vUv.y > 0.5
                && vUv.y < 0.8
                && (sin(5.0 * 3.1415 * (vUv.x - 0.05)) > -0.8)
                && (sin(50.0 * vUv.y) > 0.5);

            if (isInWindow) {
                diffuseColor = ${COLOR_PALETTE_GLSL.color9};
            }
            `
        );

        this.userData.shader = shader;
    }
}

class BuildingMaterialD extends CustomMaterial {
    onBeforeCompile(shader) {
        super.onBeforeCompile(shader);

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_fragment>",
            `
            diffuseColor = ${COLOR_PALETTE_GLSL.black};

            bool isInWindow = vUv.y > 0.1
                && (sin(50.0 * vUv.y) > -0.8);

            if (isInWindow) {
                diffuseColor = ${COLOR_PALETTE_GLSL.color5};
            }
            `
        );

        this.userData.shader = shader;
    }
}

class MaterialsLibrary {
    static default = new DefaultMaterial();
    static road = new RoadMaterial();
    static sun = new SunMaterial();
    static mountain = new MountainMaterial();
    static car = new CarMaterial();
    static wheel = new WheelMaterial();
    static light = new LightMaterial();
    static buildingA = new BuildingMaterialA();
    static buildingB = new BuildingMaterialB();
    static buildingC = new BuildingMaterialC();
    static buildingD = new BuildingMaterialD();
}

class Road extends THREE.Group {
    constructor() {
        super();

        const geometry = new THREE.PlaneGeometry();
        const material = MaterialsLibrary.road;
        const road = new THREE.Mesh(geometry, material);

        road.scale.set(200, 200, 1);
        road.rotation.set(-Math.PI / 2, 0, 0);

        if (FLAGS.ENABLE_SHADOWS) {
            road.receiveShadow = true;
        }

        this.add(road);

        const reflector = new THREE.Reflector(new THREE.PlaneGeometry(10, 10), {
            color: new THREE.Color(0x7f7f7f),
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio
        });

        reflector.position.set(0, -0.1, 0);
        reflector.scale.set(200, 200, 1);
        reflector.rotation.set(-Math.PI / 2, 0, 0);

        this.add(reflector);
    }
}

class Sun extends THREE.Group {
    constructor() {
        super();

        const geometry = new THREE.PlaneGeometry();
        const material = MaterialsLibrary.sun;
        const sun = new THREE.Mesh(geometry, material);

        sun.scale.set(50, 50, 1);

        this.add(sun);
    }
}

class Mountain extends THREE.Group {
    constructor() {
        super();

        const material = MaterialsLibrary.mountain;
        const shape = new THREE.Shape();

        shape.moveTo(0, 0);
        shape.lineTo(100, 0);
        shape.lineTo(100, 50);
        shape.lineTo(50, 10);
        shape.lineTo(20, 15);
        shape.lineTo(15, 5);
        shape.lineTo(10, 10);
        shape.lineTo(0, 0);
        shape.lineTo(-5, 3);
        shape.lineTo(-10, 10);
        shape.lineTo(-12, 8);
        shape.lineTo(-100, 50);
        shape.lineTo(-100, 0);
        shape.lineTo(0, 0);

        const geometry = new THREE.ExtrudeGeometry(shape);
        const mountain = new THREE.Mesh(geometry, material);

        this.add(mountain);
    }
}

class Car extends THREE.Group {
    constructor() {
        super();

        {
            const material = MaterialsLibrary.car;
            const shape = new THREE.Shape();

            shape.moveTo(0, 0);
            shape.lineTo(4, 0);
            shape.lineTo(3.8, 0.3);
            shape.lineTo(-0.1, 0.7);
            shape.lineTo(0, 0);

            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: 1.5,
                bevelThickness: 0.2
            });

            const body = new THREE.Mesh(geometry, material);

            body.position.set(0, 0.3, 0);

            this.add(body);
        }

        {
            const material = MaterialsLibrary.car;
            const geometry = new THREE.CylinderGeometry(0.6, 1.2, 0.5, 4);
            const roof = new THREE.Mesh(geometry, material);

            roof.position.set(1.5, 1, 0.8);
            roof.rotation.set(0, Math.PI / 4, 0);

            this.add(roof);
        }

        {
            const material = MaterialsLibrary.light;
            const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 12);
            const light1 = new THREE.Mesh(geometry, material);

            light1.position.set(-0.2, 0.9, 0);
            light1.rotation.set(0, 0, Math.PI / 2);

            this.add(light1);

            const light2 = new THREE.Mesh(geometry, material);

            light2.position.set(-0.2, 0.9, 0.3);
            light2.rotation.set(0, 0, Math.PI / 2);

            this.add(light2);

            const light3 = new THREE.Mesh(geometry, material);

            light3.position.set(-0.2, 0.9, 1.2);
            light3.rotation.set(0, 0, Math.PI / 2);

            this.add(light3);

            const light4 = new THREE.Mesh(geometry, material);

            light4.position.set(-0.2, 0.9, 1.5);
            light4.rotation.set(0, 0, Math.PI / 2);

            this.add(light4);
        }

        {
            const material = MaterialsLibrary.wheel;

            const geometry = new THREE.CylinderGeometry(1, 1, 1, 12);
            const wheel1 = new THREE.Mesh(geometry, material);

            wheel1.scale.set(0.33, 2, 0.33);
            wheel1.position.set(3, 0.33, 0.75);
            wheel1.rotation.set(Math.PI / 2, 0, 0);

            this.add(wheel1);

            const wheel2 = new THREE.Mesh(geometry, material);

            wheel2.scale.set(0.33, 2, 0.33);
            wheel2.position.set(0.7, 0.33, 0.75);
            wheel2.rotation.set(Math.PI / 2, 0, 0);

            this.add(wheel2);
        }
    }
}

class BuildingA extends THREE.Group {
    constructor() {
        super();

        const material = MaterialsLibrary.buildingA;
        const geometry = new THREE.BoxGeometry();
        const building = new THREE.Mesh(geometry, material);

        building.scale.set(10, 15, 10);
        building.position.set(0, -3, 0);

        if (FLAGS.ENABLE_SHADOWS) {
            building.castShadow = true;
        }

        this.add(building);

        const roofGeometry = new THREE.ConeGeometry(5, 15, 7);
        const roof = new THREE.Mesh(roofGeometry, material);

        roof.position.set(0, 5, 0);

        this.add(roof);
    }
}

class BuildingB extends THREE.Group {
    constructor() {
        super();

        const material = MaterialsLibrary.buildingB;
        const geometry = new THREE.CylinderGeometry();
        const building = new THREE.Mesh(geometry, material);

        building.scale.set(5, 15, 5);
        building.position.set(0, -3, 0);

        if (FLAGS.ENABLE_SHADOWS) {
            building.castShadow = true;
        }

        this.add(building);

        const roofGeometry = new THREE.SphereGeometry(7);
        const roof = new THREE.Mesh(roofGeometry, material);

        roof.position.set(0, 2, 0);
        roof.rotation.set(0, 0.3, 0);

        this.add(roof);
    }
}

class BuildingC extends THREE.Group {
    constructor() {
        super();

        const material = MaterialsLibrary.buildingC;
        const geometry = new THREE.BoxGeometry();
        const building = new THREE.Mesh(geometry, material);

        building.scale.set(5, 5, 5);
        building.position.set(0, -8, 0);

        if (FLAGS.ENABLE_SHADOWS) {
            building.castShadow = true;
        }

        this.add(building);
    }
}

class BuildingD extends THREE.Group {
    constructor() {
        super();

        const material = MaterialsLibrary.buildingD;
        const geometry = new THREE.ConeGeometry(1, 1, 3);
        const building = new THREE.Mesh(geometry, material);

        building.scale.set(5, 20, 5);
        building.rotation.set(0, 1, 0);

        if (FLAGS.ENABLE_SHADOWS) {
            building.castShadow = true;
        }

        this.add(building);
    }
}

class City extends THREE.Group {
    static #getRandomBuilding() {
        const choice = Math.random();

        if (choice < 0.2) {
            return new BuildingA();
        }

        if (choice < 0.3) {
            return new BuildingB();
        }

        if (choice < 0.9) {
            return new BuildingC();
        }

        return new BuildingD();
    }

    constructor() {
        super();

        for (let z = 0; z < 200; z += 20) {
            for (let x = 70; x >= 10; x -= 20) {
                this.#initBuilding(x, z);
            }

            for (let x = 120; x <= 180; x += 20) {
                this.#initBuilding(x, z);
            }
        }
    }

    #initBuilding(x, z) {
        const building = City.#getRandomBuilding();

        building.position.set(x, 20 / 2, z);

        this.add(building);
    }

    update() {
        this.children.forEach((building) => {
            const { x, z } = building.position;

            let newZ = z - 0.5;

            if (newZ < 0) {
                newZ = 200;
            }

            const y = newZ <= 150 ? 10 : 10 + 20 * ((150 - newZ) / 50);

            building.position.set(x, y, newZ);
        });
    }
}

class Stars extends THREE.Group {
    constructor() {
        super();

        const geometry = new THREE.SphereGeometry();
        const material = MaterialsLibrary.light;

        for (let x = -300; x < 300; x += 30) {
            for (let y = 0; y < 300; y += 30) {
                const star = new THREE.Mesh(geometry, material);

                const dx = 25 * Math.random();
                const dy = 25 * Math.random();
                const s = Math.random();

                star.scale.set(s, s, s);
                star.position.set(x + dx, y + dy, 0);

                this.add(star);
            }
        }
    }
}

class ObjectsLibrary {
    static road = new Road();
    static sun = new Sun();
    static mountain = new Mountain();
    static car = new Car();
    static city = new City();
    static stars = new Stars();
}

class SandboxWorld extends THREE.Group {
    #savedObjects;

    constructor() {
        super();

        this.#initObjects();
        this.#initLights();
    }

    #initObjects() {
        const { road, car, sun, city, mountain, stars } = ObjectsLibrary;

        road.position.set(0, 0, 100);

        sun.position.set(0, 10, 200);
        sun.rotation.set(-Math.PI, 0, 0);

        city.position.set(-100, 0, 0);

        mountain.position.set(0, 0, 200);

        car.position.set(0.7, 0, 10);
        car.rotation.set(0, -Math.PI / 2, 0);

        stars.position.set(0, 0, 250);

        this.add(road);
        this.add(sun);
        this.add(car);
        this.add(city);
        this.add(mountain);
        this.add(stars);

        this.#savedObjects = { car, city };
    }

    #initLights() {
        const ambient = new THREE.AmbientLight({
            color: COLOR_PALETTE.color3,
            intensity: 0.1
        });

        this.add(ambient);

        const point = new THREE.PointLight({
            color: COLOR_PALETTE.color1,
            intensity: 5,
            decay: 0.5,
            distance: 300
        });

        point.position.set(0, 30, 180);

        if (FLAGS.ENABLE_SHADOWS) {
            point.castShadow = true;
        }

        this.add(point);
    }

    update() {
        const t = performance.now() / 1000;

        this.#savedObjects.car.position.set(0.7 + 0.2 * Math.sin(t), 0, 10);

        this.#savedObjects.city.update();
    }
}

class FullScreen3DExample {
    static CSS_ROOT = "full-screen-3d-example";
    static CSS_ROOT_LOADED_VARIANT = "-loaded";

    #root;
    #frameRequestId;
    #scene;
    #world;
    #camera;
    #cameraData;
    #renderer;
    #composer;

    constructor(root) {
        this.#root = root;
        this.#root.classList.add(FullScreen3DExample.CSS_ROOT);
        this.#initScene();
        this.#initObjects();
        this.#initCamera();
        this.#initRenderer();
        this.#initComposer();
        this.#initEventListeners();
        this.#onWindowResize();
        this.#root.classList.add(FullScreen3DExample.CSS_ROOT_LOADED_VARIANT);
        this.#render();
    }

    #initScene() {
        this.#scene = new THREE.Scene();
    }

    #initObjects() {
        this.#world = new SandboxWorld();

        this.#scene.add(this.#world);
    }

    #initCamera() {
        const fov = 45;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 1;
        const far = 1000;

        this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.#camera.position.set(0, 2, 1);
        this.#camera.lookAt(0, 0, 200);
        this.#camera.updateProjectionMatrix();

        this.#cameraData = {
            positionX: 0,
            positionY: 2
        };
    }

    #initRenderer() {
        const clearColor = COLOR_PALETTE.black;
        const clearColorAlpha = 1;

        this.#renderer = new THREE.WebGLRenderer({
            alpha: true,
            logarithmicDepthBuffer: true
        });
        this.#renderer.setClearColor(clearColor, clearColorAlpha);
        this.#renderer.setPixelRatio(window.devicePixelRatio);

        if (FLAGS.ENABLE_SHADOWS) {
            this.#renderer.shadowMap.enabled = true;
            this.#renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        this.#root.appendChild(this.#renderer.domElement);
    }

    #initComposer() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.#composer = new THREE.EffectComposer(this.#renderer);
        this.#composer.setSize(width, height);
        this.#initRenderPass();

        if (FLAGS.ENABLE_BLOOM) {
            this.#initBloomPass();
        }

        if (FLAGS.ENABLE_NOISE) {
            this.#initShaderPass();
        }
    }

    #initRenderPass() {
        const renderPass = new THREE.RenderPass(this.#scene, this.#camera);

        this.#composer.addPass(renderPass);
    }

    #initBloomPass() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const resolution = new THREE.Vector2(width, height);
        const strength = 0.8;
        const radius = 0.5;
        const threshold = 0.1;

        const bloomPass = new THREE.UnrealBloomPass(
            resolution,
            strength,
            radius,
            threshold
        );

        this.#composer.addPass(bloomPass);
    }

    #initShaderPass() {
        const pass = new THREE.ShaderPass({
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: null
                },
                uTime: {
                    value: 1
                }
            },
            vertexShader: `
                varying vec2 vUv;

                void main() {
                    vUv = uv;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,
            fragmentShader: `
                uniform float uTime;
                uniform sampler2D tDiffuse;

                varying vec2 vUv;

                float rand(vec2 seed);
                float noise(vec2 position);

                void main() {
                    vec4 color = texture2D(tDiffuse, vUv);

                    float d = 0.05 * noise(50.0 * (100.0 * uTime + vec2(vUv.x, 20.0 * vUv.y)));

                    color = vec4(color.r - d, color.g - d, color.b - d, 1.0);

                    gl_FragColor = color;
                }

                float rand(vec2 seed) {
                    return fract(sin(dot(seed, vec2(12.9898,78.233))) * 43758.5453123);
                }

                float noise(vec2 position) {
                    vec2 blockPosition = floor(position);

                    float topLeftValue     = rand(blockPosition);
                    float topRightValue    = rand(blockPosition + vec2(1.0, 0.0));
                    float bottomLeftValue  = rand(blockPosition + vec2(0.0, 1.0));
                    float bottomRightValue = rand(blockPosition + vec2(1.0, 1.0));

                    vec2 computedValue = smoothstep(0.0, 1.0, fract(position));

                    return mix(topLeftValue, topRightValue, computedValue.x)
                        + (bottomLeftValue  - topLeftValue)  * computedValue.y * (1.0 - computedValue.x)
                        + (bottomRightValue - topRightValue) * computedValue.x * computedValue.y;
                }
            `
        });

        pass.renderToScreen = true;

        this.#composer.addPass(pass);
    }

    #initEventListeners() {
        window.addEventListener("resize", this.#onWindowResize.bind(this));
        document.addEventListener("mousemove", this.#onMouseMove.bind(this));
    }

    #onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.#camera.aspect = width / height;
        this.#camera.updateProjectionMatrix();
        this.#renderer.setSize(width, height);
        this.#composer.setSize(width, height);
    }

    #onMouseMove(e) {
        this.#cameraData.positionX =
            (5 * (window.innerWidth / 2 - e.clientX)) / window.innerWidth;
        this.#cameraData.positionY =
            2 +
            (0.5 * (window.innerHeight / 2 - e.clientY)) / window.innerHeight;
    }

    #updateEverything() {
        const t = performance.now() / 1000;

        this.#world.update();

        this.#scene.traverse((child) => {
            if (child.isMesh) {
                const { shader } = child.material.userData;

                if (shader) {
                    shader.uniforms.uTime.value = t;
                }
            }
        });

        this.#composer.passes.forEach((pass) => {
            if (pass instanceof THREE.ShaderPass) {
                // eslint-disable-next-line no-param-reassign
                pass.uniforms.uTime.value = t % 10;
            }
        });

        {
            const x =
                this.#cameraData.positionX +
                0.3 * (Math.sin(0.1 * t) + Math.sin(0.05 * t));
            const y = this.#cameraData.positionY + 0.3 * Math.cos(0.3 * t);

            this.#camera.position.set(x, y, 1);
            this.#camera.updateProjectionMatrix();
        }
    }

    #render() {
        this.#updateEverything();

        this.#composer.render(this.#scene, this.#camera);
    }

    start() {
        this.#render();

        this.#frameRequestId = requestAnimationFrame(this.start.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.#frameRequestId);
    }
}

function main(){
    const root = document.getElementById("root");
    const example = new FullScreen3DExample(root);

    example.start();
}

document.addEventListener("DOMContentLoaded", main);
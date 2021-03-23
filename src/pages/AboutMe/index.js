import React, { Suspense, useRef, useEffect } from "react";
import styled from "styled-components";

import { Canvas, useFrame } from "react-three-fiber";
import { Html, useGLTF } from "@react-three/drei";
import { useInView } from "react-intersection-observer";

import { theme } from "theme";

import { Section } from "./section";
import state from "./state";

const modelBaseUrl = process.env.PUBLIC_URL + "/models";

const Model = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);
  console.log(`gltf`, gltf);
  return <primitive object={gltf.scene} dispose={null}></primitive>;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight position={[1000, 0, 0]} intensity={1} />
    </>
  );
};

const HTMLContent = ({
  bgColor,
  children,
  modelPath,
  positionY,
  domContent,
  rootRef
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  const [refItem, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    inView && (rootRef.current.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model modelPath={modelPath}></Model>
        </mesh>

        <Html portal={domContent} fullscreen>
          <div ref={refItem} style={{ width: "100%", height: "100vh" }}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function AboutMe() {
  const domContent = useRef();
  const scrollArea = useRef();
  const rootRef = useRef();
  const onScroll = e => (state.top.current = e.target.scrollTop);

  useEffect(() => {
    onScroll({ target: scrollArea.current });
  }, []);
  return (
    <RootContaienr ref={rootRef}>
      {/* <Header /> */}
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            modelPath={modelBaseUrl + "/armchairYellow.gltf"}
            positionY={250}
            bgColor="#f15946"
            rootRef={rootRef}
          >
            <Container>
              <Title>
                Hi I'm youngjin, javascript developer. <br />I made{" "}
                <StyledA href="https://github.com/HYJ29/blog_front">
                  this blog
                </StyledA>{" "}
                as my sandbox for new techs and practice <br />
                This "About" page is really new on my blog. <br />
                I'm planning to make this page with{" "}
                <StyledA href="https://threejs.org/">three.js</StyledA> <br />
                These chairs are kind of dummy. <br />
                But I think it's funny already!
              </Title>
            </Container>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath={modelBaseUrl + "/armchairGreen.gltf"}
            positionY={0}
            bgColor="#571ec1"
            rootRef={rootRef}
          >
            <Container>
              <Title>
                I develop web with react,{" "}
                <StyledA href="https://apps.apple.com/us/app/wedo-mobile/id1546717826">
                  mobile
                </StyledA>{" "}
                with react-native & expo. <br />
                Know how to develop{" "}
                <StyledA href="https://github.com/HYJ29/blog_api">
                  node server.
                </StyledA>{" "}
                <br />
                And have exprienc AWS , Firebase cloud service <br />
                I'm general service developer.
              </Title>
            </Container>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath={modelBaseUrl + "/armchairGray.gltf"}
            positionY={-250}
            bgColor="#636567"
            rootRef={rootRef}
          >
            <Container>
              <Title>
                Yes, this blog app needs some refactoring on code and
                performance <br />
                I'll do it next time. <br />
                If you have anything want to talk with me,
                <br />
                Contact me. HYJ2900@gmail.com :)
              </Title>
            </Container>
          </HTMLContent>

          <Lights />
        </Suspense>
      </Canvas>
      <ScrollArea className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </ScrollArea>
    </RootContaienr>
  );
}

const RootContaienr = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const Container = styled.div`
  /* margin: 0 auto; */
  width: 100%;
  max-width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 32px;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  color: #fff;
  line-height: 50px;
  padding: 10px 0;

  span {
    display: block;
  }
  @media (min-width: 600px) {
    font-size: 40px;
    line-height: 100px;
  }
`;

const ScrollArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

const StyledA = styled.a`
  color: white;
`;

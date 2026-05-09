import {registerRoot, Composition} from 'remotion';
import {EdgeMatrixVideo} from './EdgeMatrixVideo';

const RemotionRoot = () => {
  return (
    <Composition
      id="EdgeMatrixPro"
      component={EdgeMatrixVideo}
      durationInFrames={990}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(RemotionRoot);

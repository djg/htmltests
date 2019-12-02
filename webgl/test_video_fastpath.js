var gl;
var video;

function is(a, b, desc) {
    if (a !== b) {
        alert(desc);
    }
}

function ok(a, desc) {
    if (!a) {
        alert(desc);
    }
}

function onPlayingTestVideo() {
  video.removeEventListener("playing", onPlayingTestVideo, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
  is(
    gl.getError(),
    gl.NO_ERROR,
    "texImage2D should not generate any error here."
  );
  video.pause();
}

function startTest(file) {
    gl = document.createElement("canvas").getContext("webgl");
  // ext = gl.getExtension("MOZ_debug");
  //ok(ext, "MOZ_debug extenstion should exist");
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  //gl.pixelStorei(ext.UNPACK_REQUIRE_FASTPATH, true);
    is(
        gl.getError(),
        gl.NO_ERROR,
        "pixelStorei should not generate any error here."
    );
    
    video = document.createElement("video");
    video.addEventListener("playing", onPlayingTestVideo, true);
    video.preload = "auto";
    video.muted = true;
    video.src = file;
    video.loop = true;
    document.body.appendChild(video);
    video.play();
}

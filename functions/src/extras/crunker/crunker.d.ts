declare class Crunker {
    fetchAudio(...filepaths);
    mergeAudio(buffers);
    concatAudio(buffers);
    export(buffer, audioType);
}
export = Crunker;
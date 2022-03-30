import sys, os, random, json, math, time

def PickVoice(Song, Chord):
    chunks = os.listdir(os.getcwd() + '/Songs/' + Song + "/" + Chord)
    chunkcount = len(chunks)

    return random.randint(1, chunkcount)

    

if sys.argv[1] == "--pick-voicing":
    result = PickVoice(sys.argv[2], sys.argv[3])
    sys.stdout.write(str(result))
elif sys.argv[1] == "--generate-song":
    # Just to be safe
    os.system("rm ./lead.wav ./temp.wav")

    songdatafile = open("Songs/" + str(sys.argv[2]) + '/song.json', "r");
    jsondata = json.loads(songdatafile.read())
    
    chunkpos = 0

    print("cp ./Songs/"+sys.argv[2]+"/base.wav ./temp.wav")
    os.system("cp ./Songs/"+sys.argv[2]+"/base.wav ./temp.wav")

    for i in range(len(jsondata["Sections"])):
        if jsondata["Sections"][i]["Improv"] == True:
            for c in range(len(jsondata["Sections"][i]["Chords"])):
                VoiceNum = PickVoice(sys.argv[2], jsondata["Sections"][i]["SamplesFolder"] + "/" + jsondata["Sections"][i]["Chords"][c])
                padpos = chunkpos * (jsondata["BPM"] / 60 * jsondata["Numerator"] / jsondata["Denominator"])

                print("sox -m ./temp.wav \"| sox ./Songs/"+sys.argv[2]+"/"+jsondata['Sections'][i]["SamplesFolder"]+"/"+jsondata['Sections'][i]["Chords"][c]+"/"+str(VoiceNum)+".wav -p pad "+str(padpos)+" 0\" ./lead.wav")
                os.system("sox -m ./temp.wav \"| sox ./Songs/"+sys.argv[2]+"/"+jsondata['Sections'][i]["SamplesFolder"]+"/"+jsondata['Sections'][i]["Chords"][c]+"/"+str(VoiceNum)+".wav -p pad "+str(padpos)+" 0\" ./lead.wav")
                chunkpos += 1
                print("mv ./lead.wav ./temp.wav")
                os.system("mv ./lead.wav ./temp.wav")
        else:
            print("Skip " + str(jsondata["Sections"][i]["Bars"]) + " Bars")
            chunkpos += jsondata["Sections"][i]["Bars"]
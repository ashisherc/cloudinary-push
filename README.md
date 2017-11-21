## cloudinary-push

Cloudinary command line tool to upload images to cloudinary cdn from terminal. Currently only image upload is supported, feel free to contibute.

#### Install

```sh
npm install -g cloudinary-push
```
You will need upload preset to configure this, find it in docs here [doc](https://cloudinary.com/documentation/upload_images#upload_presets).

### Usage

```sh
cloudinary-push config -p presetname -c cloudname
```
#### To upload an image

```sh
cloudinary-push filename
```


Command | Options | Use
--- | --- | ---
config | -p , -c | provide preset name and cloudname
reset | | remove the config

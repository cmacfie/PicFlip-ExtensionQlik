# PicFlip-ExtensionQlik

Image extension for Qlik Sense

# This extension will not be updated

Hi everyone. I made this extension as an introduction project when I interned at Qlik in 2017. I no longer work with Qlik in any way and will not be updating it. I've been contacted a few times by people need help to attatch images to the extension. I hope this image helps people who were stuck:

![Alt text](./screenshots/picflip.png?raw=true "How to link a URL")

What is happening in the code is that an `<img>` element gets its `src` attribute set to the url you give it.

The URL needs to be hosted online for security reasons. If you are in need of support, this extension might not be for you, as I unfortunetly don't have the time to give any.

## Purpose & Description

This is a sleek and easy to use visualization extension for applications where you need to display images! Use it to make your presentation more fun, your data more understandable or your application more beautiful!

The extension only supports Google Chrome.

![Alt text](./screenshots/Display1.gif?raw=true "Displaying normal usage")

## Customization

|Image Settings |Text Settings | Color Settings |
|:----------:|:------------:|:-------------:|
| ![Alt text](./screenshots/Settings-ImageAppearance.png?raw=true "Image manipulation settings") | ![Alt text](./screenshots/Settings-Text.png?raw=true "Text settings") | ![Alt text](./screenshots/Settings-Color.png?raw=true "Color settings") |

## Examples with different settings

**Please note that the gifs are not as smooth as the extension**

You can change plenty of things in this extension. Here are just a few examples of the same app with
different settings in the application.

### Example 1
3 images per row, 3 measurements, left-center aligned text, image cropped to fit square, quick flip time, vertical flip, black background, lively colors, low image opacity on the back.
![Alt text](./screenshots/SoftwareCompany_1.gif?raw=true "Displaying normal usage")

### Example 2
Center-center aligned text, image contained within square, horizontal flip
![Alt text](./screenshots/SoftwareCompany_4.gif?raw=true "Displaying normal usage")

### Example 3
2 images per row, 1 measurement, bottom-center aligned text, image cropped to fit square, instant flip time, hide titles, full opacity on the back
![Alt text](./screenshots/SoftwareCompany_3.gif?raw=true "Displaying normal usage")

### Example 4
Start with images turned over, locked to make them not flip over
![Alt text](./screenshots/SoftwareCompany_7.gif?raw=true "Displaying normal usage")

### Example 5
Or simply have it as a simple image display by having it be locked. In this example the corner circle is on, displaying what position in the list they are. It's sorted by amount of bugs found per person.
![Alt text](./screenshots/SimpleDisplay.png?raw=true "Displaying normal usage")

## Technical

The extension is made with Angular and css. **The extension is made for Google Chrome and does not work for Firefox**. The images are linked via URL:s.
Because of security reasons in browsers you can not link to local files on your machine, but must host the images online.

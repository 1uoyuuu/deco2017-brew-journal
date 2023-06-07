# DECO2017-Brew Journal

# Overview
The web application is designed to cater to coffee enthusiasts, aiming to reignite their passion for brewing coffee and offering guidance to enhance their skills. It comprises four main sections, each serving a unique purpose.
1.  **Overview**: In the Overview section, users can interact with a coffee flavor chart and gain insights into their brew journal's overall statistics. It offers an engaging experience while providing a comprehensive overview of their brewing journey.
2.  **Coffee**: The Coffee section presents a scrollable list of all the added coffees. Users can click on each entry to view detailed information or add new coffees whenever desired.
3.  **Gadget**: In the Gadgets section, users can explore their collection of drippers and grinders. It showcases their existing equipment and also allows users to add new gadgets to expand their collection.
4.  **Brew**: The Brew section serves as a documentation hub for all logged brews. Users can record and review their brewing activities within this section, enabling them to keep track of their brewing experiments and learn from their experiences.


# Configuration & Deployment

## Installation
### 1. Clone the repository
There are 2 ways to download the repository from GitHub:
1.  **Download as a ZIP file**: Navigate to the main page of the repository on GitHub, click the "Code" button, and then click "Download ZIP". You will then extract the ZIP file to access the project files.
2.  **Clone with Git:** If you have Git installed on your device, you can log the following command into your terminal to clone the repository:
    `git clone https://github.com/1uoyuuu/deco2017-brew-journal`

### 2. Download Node.js
Make sure you have downloaded node.js on your machine, if you are not sure, you can check your node verision with `node --version`.  You can download node.js from [Node.js Download](https://nodejs.org/en/download). I have used Node.js **version 16.x** for this project, so make sure your Node.js version is compatible.
### 3. Install necessary dependencies
Once you have opened the project folder in your code editor (such as Visual Studio Code) and have a terminal open, follow these steps to install the necessary packages and run the web app:

1.  In your terminal, type `npm install` and hit Enter. This command will initiate the installation process for all the required packages needed to run the web app.
    
2.  Depending on your internet connection and the size of the packages, the installation may take some time, especially if it's your first time running the app. Please be patient and let the process complete.
    

Once the installation is finished, you can proceed with running the web app.

### 4. Start the server and play around
  
To start the web server on your local host, follow these steps:

1.  In your terminal, type `npm run dev` and hit Enter. This command will initiate the web server and begin the application's execution.
    
2.  Wait for the process to complete. Once it finishes, you will see a message displaying **`Server running at http://localhost:1234`**.
    
3.  To open the application, simply click on the provided link. If you're using a Mac, you can use the shortcut (cmd+click) to open the link.
4. For the optimal experience, it is recommended to adjust your browser window size to match the provided optimal screen sizes (Optional).

## Optimal Screen Size
This web application has been developed with responsive design considerations, although it primarily focuses on the desktop version. During the design and testing phase, specific window sizes were used as the basis for ensuring a seamless user experience. These sizes are as follows:

-   Desktop: **1440 x 900** (Macbook Pro 13")
-   Mobile: **390 x 844** (Chrome Dev Tools - iPhone 12 Pro)

While the application has been primarily optimized for these specific screen sizes, the use of relative units like rem ensures that it should adapt reasonably well to other popular screen sizes. However, due to time constraints, comprehensive testing across all possible screen sizes may not have been conducted.

# Testing 
This application features three forms for adding coffee, gadget, and brew information. Users can upload images to enhance the visual display. For testing purposes, there is a folder called **"testing_images"** with a variety of images to choose from. If you need help filling out the forms or want sample information, I have provided some examples below for you to simply copy and paste.
By the way,  for a quicker logging process, you only need to fill in the information with red asterisk on the top right corner, you can leave the rest of them blank.
### Sample Coffee Information Table
|  | Coffee 1 | Coffee 2 | Coffee 3 | Coffee 4 | Coffee 5 | Coffee 6 |
|---|---|---|---|---|---|---|
| Type | Single Origin | Blend | Single Origin | Single Origin | Single Origin | Single Origin |
| Coffee Name | Fruity Bomb | Gundam Blend | Daye Bensa | Mysterious | Finca el paraiso | Santa clara |
| Roaster Name | Standout | Sleepy Bloc | Jibbithelittles | Fragment | Jibbithelittles | Stitch |
| Roaster Country | Sweden | Australia | Australia | Australia | Australia | Australia |
| Roast Date | Pick one date | Pick one date | Pick one date | Pick one date | Pick one date | Pick one date |
| Roast Level | Extra Light | Medium | Light | Light | Light | Omni roast |
| Weight | 250 | 250 | 75 | 100 | 75 | 100 |
| Price | 30 | 22 | 25 | 40 | 40 | 50 |
| Flavours | Strawberry, Cream, Mango | Apricot, Rasberry jam, French earl gray | Mango, Kiwi, Strawberry, Floral | Strawberry, Molassess, Peach, Candy | Strawberry, Rasberry, Cranberry | Cheery, Rose |
| Origin Country | Colombia | Brazil | Ethiopia | Colombia | Colombia | Guatemala |
| Origin Region | Cauca |  | Sidamo | Cauca |  |  |
| Origin Farm | El Paraiso | Sitio Melado |  | El Paraiso 92 |  | Santa Clara |
| Producer Name |  | Señor Fonseca |  |  | Diego Benitez |  |
| Process Name | Carbonic Maceration | Natural | Natural Anaerobic | Anaerobic Natural | Thermal shock washed | Washed |
| Coffee Varietal | Castillo | Mundo Novo | Heirloom | Typica | Pink bourbon | Geisha |
| Altitude |  | 1250 |  |  |  |  |
| Photo | public/testing_images/coffe-1.jpg | public/testing_images/coffe-2.jpg | public/testing_images/coffe-3.jpg | public/testing_images/coffe-4.jpg | public/testing_images/coffe-5.jpg | public/testing_images/coffe-6.jpg |

### Sample Gadget Information Table
|  | Gadget 1 | Gadget 2 | Gadget 3 | Gadget 4 | Gadget 5 | Gadget 6 |
|---|---|---|---|---|---|---|
| Type | Grinder | Grinder | Grinder | Dripper | Dripper | Dripper |
| Name | C40 | EK43 | MK47 | Origami | V60 | Orea V3 |
| Brand | Comandante | Mahlkonic | Kinu | Fellow | Hario | Orea |
| Burr Type/Dripper Material | Conical | Flat | Conical | Ceramic | Metal | Plastic |
| Photo | public/testing_images/grinder-c40.jpg | public/testing_images/grinder-ek43.jpg | public/testing_images/grinder-kinu.jpg | public/testing_images/dripper-origami.jpg | public/testing_images/dripper-v60.jpg | public/testing_images/dripper-orea.jpg |
### Sample Brew Information Table
|  |  |  |  |
|---|---|---|---|
| Coffee | Daye Bensa | Fruity Bomb | Mysterious |
| Dripper | Origami | Orea V3 | V60 |
| Grinder | C40 | Kinu | EK43 |
| Grinder Setting | 24 | 3.5 |  |
| Recipe Link |  |  |  |
| Water Temperature | 92 | 94 | 93 |
| Water Amount | 240 | 225 | 225 |
| Coffee Amount | 16 | 15 | 15 |
| Bloom Time | 30 | 30 | 40 |
| Brew Time(Min) | 1 | 1 | 2 |
| Brew Time(Sec) | 55 | 45 | 05 |
| Beverage Amount | 190 |  | 180 |
| Tasting Note | Anything you like | Strawberry, Candy, Rasberry | Cherry, Rose water |
| Rating | Select any one | Select any one | Select any one |
| Note |  |  |  |



# Development Process
For the specific design process, please refer to the link: [Brew Journal Design Process](https://www.canva.com/design/DAFhX94Xj2s/INwOZ8V2FLWXxYcQlDf_Xw/edit?utm_content=DAFhX94Xj2s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

To be honest, this project has been the most time-consuming one for the semester, even more challenging than a 12cp unit. I recognize that the complexity of my design contributed to this. Despite the difficulties, I have managed to implement most of the features outlined in the design. However, there is still room for improvement.

This web app consists of three unique multi-page forms, requiring the implementation and processing of over 30 user inputs. Additionally, each section is designed to display information in a different manner, adding creativity to the app. Interactive charts, scrollable lists, draggable slideshows, and expandable accordions are incorporated to enhance the user experience. Throughout the development phase, I encountered numerous challenges. I will discuss these challenges in more detail later.

## Packages
The web application includes the following packages, in addition to the core dependencies:

-   **@glidejs/glide** (version "^3.6.0"): This library is utilized for creating a slideshow in the gadget section.
-   **@yaireo/tagify** (version "^4.17.8"): This package is used for implementing tag inputs in the form.
-   **a11y-dialog** (version "^7.5.2"): It serves as an overlay modal and acts as the entry point for each form.
-   **accordion-js** (version "^3.3.4"): This package is used to create accordion elements in the brew section.
-   **colorthief** (version "^2.4.0"): It is employed to extract the dominant color from provided images.
-   **echarts** (version "^5.4.2"): This package is responsible for generating interactive charts.
-   **express** (version "^4.18.2"): It is used for backend development setup.
-   **sass** (version "^1.62.0"): This package is utilized for managing styles in a clear and straightforward manner.


## Challenges
Throughout the development process, I encountered several challenges that proved to be valuable learning experiences. These challenges have provided me with insights and knowledge that will help me grow as a developer. Here are some of the key challenges I faced:
### 1. How to add animation to a element from `display:none` to `display:block`
  
#### Problem:
I faced a challenge when attempting to toggle the display state of the coffee detail information. My goal was to make the detail information pop up on the left-hand side when I clicked on different items in the right-hand side list. Initially, I tried toggling the display between "none" and "block", but I wanted to add transition effects like scaling and opacity changes for a smoother visual experience. However, I encountered a roadblock—the transition effects didn't work as expected. It turned out that transitions don't apply to elements with a display value of "none".
#### Solution:
I found a solution to the challenge by incorporating a `setTimeout()` function during the transition from `display:none` to `display:block`. Instead of changing the display directly in the style sheet, I used JavaScript to modify the display property and added the `setTimeout()` function to handle the transition styles. Here is a snippet of the code, refer to script.js line 409 for a detailed implementation.
```xml
    item.style.display  =  "flex";
    window.setTimeout(function () {
    item.style.opacity  =  1;
    item.style.transform  =  'scale(1)';
    }, 100); // the 100 here is a safe value after some experiments
```
### 2. How to keep the same position when refreshing the page
#### Problem:
When I figured out how to refresh the webpage to render new information automatically after user submitting the form, I encountered an annoying issue, the refreshing always goes back to the top of the webpage, which is not user-fridently at all.
#### Solution:
I initially attempted to solve the problem by using the command `window.location.reload(true);` to reload the webpage while keeping it at the same scroll position. However, I encountered situations where this solution didn't work consistently, and I couldn't determine the exact reason for its intermittent behavior.

As an alternative solution, I came across a helpful suggestion on Stack Overflow from user Sanoj Dushmantha. The code provided by [Sanoj](https://stackoverflow.com/questions/17642872/refresh-page-and-keep-scroll-position) involved saving the current scroll position to the session storage and then scrolling to that position every time the DOMContentLoaded event was triggered.
```xml
document.addEventListener("DOMContentLoaded", function (event) {
        var scrollpos = sessionStorage.getItem('scrollpos');
        if (scrollpos) {
            window.scrollTo(0, scrollpos);
            sessionStorage.removeItem('scrollpos');
        }
    });

    window.addEventListener("beforeunload", function (e) {
        sessionStorage.setItem('scrollpos', window.scrollY);
    });
```

### 3. How to make customised dropdown select to reset to default value when user close/submit the form
#### Problem 1: 
The problem I encountered was that the custom dropdown select did not reset its value to the default after the user closed or submitted the form. As a result, when the user reopened the form, the select displayed the last selected value, even though it wasn't actually selected. This could lead to confusion, as it appeared that all inputs were filled in when the custom select didn't have a valid selection.

#### Solution: 
The solution here was to manually reset the rendered custom select every time user click close or submit. Here is a snippet of reseting custom-select, please refer to custom-select.js line 138 for full explanation. By the way, the custom-select code is inspired from [Codepen](https://codepen.io/webDsign/pen/yLgVJqX).
```xml
let customSelect =  document.getElementsByClassName("custom-select");
for(let i =  0; i <  customSelect.length; i++){
	let originalSel = customSelect[i].firstElementChild;
	//remove the html content
	customSelect[i].innerHTML  =  "";
	customSelect[i].appendChild(originalSel);
}
```

#### Problem 2:
Another challenge I encountered was that the custom-select component did not include built-in validation and did not trigger the "change" event like the original dropdown select. In other words, when a value was selected in the custom-select, there was no way to detect the change event programmatically.
#### Solution:
 To fix this problem, [Pillips](https://stackoverflow.com/questions/71530866/custom-dropdown-not-taking-change-event) on stackoverflow gave me the idea. It turns out we can mannually dispatch a new event to an item.
 `item.dispatchEvent(new  Event('change'));`
 
### 4. How to change the text color based on the background color for better contrast?
#### Problem:
After successfully implementing the extraction of colors from an image using the ColorThief library to use as background colors, a new challenge emerged. By default, all the texts were set to white. However, when extracting a light color from the image, such as light pink, the resulting contrast between the background color and the white text became very low. To address this, it became necessary to dynamically determine the contrast between two colors and choose an appropriate text color for optimal readability.

#### Solution:
After exploring different approaches, I discovered a solution for calculating the color luminance based on the equation `(red * 0.299) + (green * 0.587) + (blue * 0.114)`. This method, inspired by insights shared by [Ransom](https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color) on Stack Overflow, allows me to assess the lightness of a color. By calculating the luminance value, I can determine if a color is relatively light or dark. In my implementation, I found that a luminance value higher than 186 indicates a relatively light color, suitable for pairing with dark text. Conversely, a luminance value lower than 186 suggests that the color can be effectively combined with white text.

### 5. How to prevent glitch/flickering effect from image during page loading?
#### Problem:
I encountered a persistent issue with image loading across different sections of the application. Whenever the page was reloaded, the images would glitch, briefly appearing in fullscreen size for approximately 0.5 seconds before returning to their intended dimensions.

#### Solution:
To resolve the issue of images glitching during page reload, a solution can be implemented by manipulating the visibility of the affected elements. Taking the gadget slideshow as an example, setting its visibility to "hidden" initially will prevent it from being displayed, including the images it contains. Consequently, the glitch effect will be eliminated. Once all the content is fully loaded, the visibility can be changed back to "visible", allowing the slideshow and its images to appear as intended. In order to know when the content is fully loaded, just using `document.addEventListener("DOMContentLoaded", function ())`.



# Future Scope
As a passionate coffee lover, the process of creating this web application has been an incredibly rewarding experience for me. It marks my first foray into building a tangible product from scratch. Given my deep passion for coffee, I aimed to incorporate as many innovative and exciting features as possible to enhance the brewing experience within my design.

While I have dedicated my best efforts to recreating all aspects of my design, I recognize that my current skill set alone may not fully support the realization of my ambitious vision. As a result, there are various areas that require further attention and improvement in my current prototype. These include issues related to accessibility, unidentified bugs, and suboptimal hardcoded implementations that impact the overall speed and efficiency of the application.

## Overall Refinement
1.  Accessibility Enhancements: By prioritizing accessibility, I aim to make the application more inclusive and accessible to users with different abilities. This involves implementing accessibility features and adhering to established guidelines to ensure an exceptional user experience for all.
    
2.  Bug Resolution: Addressing the unidentified bugs that have arisen will be a primary focus. By conducting thorough debugging and testing, I can identify and resolve these issues, improving the overall stability and reliability of the application.
    
3.  Performance Optimization: I recognize the need to optimize the application's performance, particularly in terms of speed. By employing efficient coding practices, minimizing unnecessary hardcoding, and leveraging performance optimization techniques, I can enhance the user experience by delivering a fast and responsive application.

## Specific Features 
1.  **Sorting**: One important feature to include is the ability to sort the brew entries based on different criteria, such as name, date, rating, or any other relevant attributes. This will provide users with flexibility and convenience in organizing and accessing their brew journal entries according to their preferences.
    
2.  **Database**: Currently, all the data, including images, are stored in the local storage. However, local storage has a limited capacity of 5MB, which may not be sufficient if there is a need to store a larger amount of data. To address this limitation, implementing a database solution to store all the data online would be a more viable option. This will not only allow for a greater storage capacity but also enable users to access their brew journal from multiple devices and ensure data persistence.
    
3.  **Responsive Check**: It's crucial to perform responsive checks to ensure that the web application displays properly across various devices and screen sizes. Conducting thorough testing and optimization to guarantee a seamless user experience, regardless of whether users are accessing the application from a desktop, tablet, or mobile device, is essential. This includes testing different breakpoints, ensuring proper layout, and optimizing images and content for different screen resolutions.


# References

Abu, J. (2021). Creating a Smart Navbar With Vanilla JavaScript. Retrieved from https://css-tricks.com/creating-a-smart-navbar-with-vanilla-javascript/

Dongas, R. (n.d.). Multistepform. Retrieved from  [https://replit.com/@DECO2017/MultiStepForm#index.html](https://replit.com/@DECO2017/MultiStepForm#index.html)

Dongas, R. (2023). Upload image to base64. Retrieved from  [https://codepen.io/robdongas/pen/dyggepJ](https://codepen.io/robdongas/pen/dyggepJ)

Dushmantha, S. (2019). Refresh Page and Keep Scroll Position. Retrieved from https://stackoverflow.com/questions/17642872/refresh-page-and-keep-scroll-position

Echarts. (n.d.). Coffee Flavour Wheel. Retrieved from https://echarts.apache.org/examples/en/editor.html?c=sunburst-drink

Kolde, B. (2018). Coffee[Photograph]. Unsplash. Retrieved from https://unsplash.com/photos/-sKBWdCyBLg

Lau, J. (n.d). Custom Select Menu With Scrolling Scrollbar Rounded Corners CSS & JavaScript. Retrieved from https://codepen.io/webDsign/pen/yLgVJqX

Nick. (n.d.). Custom Cursor Using Vanilla JS. Retrieved from https://codepen.io/ntenebruso/pen/QWLzVjY

Phillips, E. (2022). Custom dropdown not taking 'change' event. Retrieved from https://stackoverflow.com/questions/71530866/custom-dropdown-not-taking-change-event

Ransom, M. (2010). How to decide font color in white or black depending on background color? Retrieved from https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color


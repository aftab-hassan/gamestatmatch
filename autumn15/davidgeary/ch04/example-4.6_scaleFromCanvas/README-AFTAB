4.6 and 4.8 are not about scaling a single image.
 You need to scale an image and a text,

 So you draw both of these into a canvas. And,
 In 4.6 - a.When the user changes scales on the slider, first populate canvas with default image, and default text size.
          b.Take the combined output of image and text, from the canvas, scale it as per user setting, and draw back to canvas.

 In 4.8 - a.Just once in the lifetime of the application, populate default image, and default text size, into an offscreen canvas,
          like a temporary variable.
          b.When the user changes scales on the slider, scale combined output from offscreen canvas, scale and show user
          c.Nothing is affected in the offscreen canvas, it remains the same (default image and text size), throughout
          the lifetime of the application

If it was only about scaling an image, you could just do like 4.4
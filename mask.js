// In development 
// Description: Creates a mask object for the jsPsych plugin
// Dependencies: jspsych.js, jspsych-psychophysics.js

///////////////////////////////////////////////////////
// Mask with a checkerboard pattern and response box //
///////////////////////////////////////////////////////

let getMask = function (config) {
  let maskObject = function (dir = Math.random() * 2 * Math.PI) {
    ;(this.obj_type = 'manual'),
      (this.generatorName = 'checkerMask'),
      (this.color = config.maskColor),
      (this.backgroundcolor = config.maskBackgroundColor),
      (this.is_frame = config.isFrame),
      (this.show_start_time = config.maskStart), // from the trial start (ms)
      (this.show_end_time = config.maskEnd), // from the trial start (ms)
      (this.show_start_frame = config.maskStart), // from the trial start (ms)
      (this.show_end_frame = config.maskEnd), // from the trial start (ms)
      (this.nSquares = Math.ceil(config.canvasWidth / config.maskGridSize)),
      (this.startX = function () {
        return Math.random() * config.maskGridSize
      }), // random start position
      (this.startY = function () {
        return Math.random() * config.maskGridSize
      }), // random start position
      (this.horiz_pix_sec = function () {
        return config.maskVelocity * Math.cos(dir)
      }), // velocity of drifting mask in pixels per second
      (this.vert_pix_sec = function () {
        return config.maskVelocity * Math.sin(dir)
      }), // random direction for each instance of the mask object
      // this.horiz_pix_frame=  function(){return config.maskVelocity*Math.cos(dir)}, // velocity of drifting mask in pixels per frame
      // this.vert_pix_frame=   function(){return config.maskVelocity*Math.sin(dir)},

      (this.drawFunc = function (stimulus) {
        // draws a checkerboard
        ctx = jsPsych.getCurrentTrial().context
        for (var i = -2; i < this.nSquares + 2; i++) {
          // -2/+2 for periodic boundary conditions
          for (var j = -2; j < this.nSquares + 2; j++) {
            if ((i + j) % 2 == 0) {
              ctx.fillStyle = config.maskBackgroundColor
            } else {
              ctx.fillStyle = config.maskColor
            }
            ctx.fillRect(
              (stimulus.currentX % (2 * config.maskGridSize)) +
                i * config.maskGridSize,
              (stimulus.currentY % (2 * config.maskGridSize)) +
                j * config.maskGridSize,
              config.maskGridSize,
              config.maskGridSize,
            )
          }
        }
      })
  }

  return maskObject
}

/////////////////////////////////
// Mask without a response box //
/////////////////////////////////

let getMaskNoBox = function (config) {
  let maskObject = function (dir = Math.random() * 2 * Math.PI) {
    ;(this.obj_type = 'manual'),
      (this.generatorName = 'checkerMask'),
      (this.color = config.maskColor),
      (this.backgroundcolor = config.maskBackgroundColor),
      (this.is_frame = config.isFrame),
      (this.show_start_time = config.maskStart),
      (this.show_end_time = config.maskEnd),
      (this.show_start_frame = config.maskStart),
      (this.show_end_frame = config.maskEnd),
      (this.nSquares = Math.ceil(config.canvasWidth / config.maskGridSize)),
      (this.startX = function () {
        return Math.random() * config.maskGridSize
      }), // random start position
      (this.startY = function () {
        return Math.random() * config.maskGridSize
      }), // random start position
      (this.horiz_pix_sec = function () {
        return config.maskVelocity * Math.cos(dir)
      }), // velocity of drifting mask in pixels per second
      (this.vert_pix_sec = function () {
        return config.maskVelocity * Math.sin(dir)
      }), // random direction for each instance of the mask object
      (this.drawFunc = function (stimulus) {
        // draws a checkerboard
        ctx = jsPsych.getCurrentTrial().context
        for (var i = -2; i < this.nSquares + 2; i++) {
          // -2/+2 for periodic boundary conditions
          for (var j = -2; j < this.nSquares + 2; j++) {
            if ((i + j) % 2 == 0) {
              ctx.fillStyle = config.maskBackgroundColor
            } else {
              ctx.fillStyle = config.maskColor
            }
            ctx.fillRect(
              (stimulus.currentX % (2 * config.maskGridSize)) +
                i * config.maskGridSize,
              (stimulus.currentY % (2 * config.maskGridSize)) +
                j * config.maskGridSize,
              config.maskGridSize,
              config.maskGridSize,
            )
          }
        }
      })
  }
  return maskObject
}

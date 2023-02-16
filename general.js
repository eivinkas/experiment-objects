// Age
let age = function (config) {
  let age = {
    type: jsPsychSurveyText,
    data: {
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
    questions: [
      {
        prompt: 'How old are you?',
        columns: 3,
        required: true,
        name: 'Age',
        button_label: 'Continue',
      },
    ],
    on_load: function () {
      let inputBox = document.getElementById('input-0')
      inputBox.setAttribute('type', 'number')
      inputBox.setAttribute('required', '')
      inputBox.style.width = '3ch'
    },
    css_classes: ['textbutton'],
  }
  return age
}

let gender = function (config) {
  let gender = {
    type: jsPsychSurveyMultiChoice,
    data: {
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
    questions: [
      {
        prompt: 'Gender',
        name: 'Gender',
        options: ['male', 'female', 'other'],
        required: true,
      },
    ],
    css_classes: ['textbutton'],
  }
  return gender
}

let screenCalibration = function (config) {
  let screenCalibration = {
    type: jsPsychResize,
    item_width: 3 + 3 / 8,
    item_height: 2 + 1 / 8,
    prompt:
      '<p style="font-size: 30px;">Screen Calibration:</p> <p style="font-size: 24px;"><br>Click and drag the lower right corner of the box until the box is the same size as a credit card held up to the screen.</p>',
    pixels_per_unit: 642 / 6,
    data: {
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
  }
  return screenCalibration
}

let browserCheck = function (config) {
  let browserCheck = {
    type: jsPsychBrowserCheck,
    data: {
      studyID: config.studyID,
      componentID: config.componentID,
      batchID: config.batchID,
      workerID: config.workerID,
    },
  }
  return browserCheck
}

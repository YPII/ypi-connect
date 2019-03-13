var assert = require('chai').assert
var caseDocumentPath = require('../src/core/case-document-path')

describe('Case Document Tests', function () {
  it('Accept Test', function (done) {
    var documentPath = caseDocumentPath.getPathByReportNo('19-3000.S')
    assert.equal(documentPath.masterAccessionNo, '19-3000')
    assert.equal(documentPath.caseLetter, 'S')
    assert.equal(documentPath.year, '2019')
    assert.equal(documentPath.caseNumber, '3000')
    assert.equal(documentPath.caseNumberRange, '003000-03999')
    var casePath = documentPath.getPath('.pdf')
    assert.equal(casePath, '\\\\cfileserver\\AccessionDocuments\\2019\\003000-03999\\19-3000\\19-3000.S.pdf')
    done()
  })
})

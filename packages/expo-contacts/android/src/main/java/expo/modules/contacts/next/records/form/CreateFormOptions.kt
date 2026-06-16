package expo.modules.contacts.next.records.form

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.OptimizedRecord

// This record is iOS only
@OptimizedRecord
class CreateFormOptions : Record {
  @Field val cancelButtonTitle: String? = null

  @Field val showsCancelButton: Boolean? = null

  @Field val preventAnimation: Boolean? = null
}

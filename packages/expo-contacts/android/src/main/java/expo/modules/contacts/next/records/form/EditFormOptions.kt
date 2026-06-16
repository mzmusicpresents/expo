package expo.modules.contacts.next.records.form

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.OptimizedRecord

// This record is iOS only
@OptimizedRecord
class EditFormOptions : Record {
  @Field val displayedPropertyKeys: List<String>? = null

  @Field val message: String? = null

  @Field val alternateName: String? = null

  @Field val allowsEditing: Boolean? = null

  @Field val allowsActions: Boolean? = null

  @Field val shouldShowLinkedContacts: Boolean? = null

  @Field val cancelButtonTitle: String? = null

  @Field val showsCancelButton: Boolean? = null

  @Field val preventAnimation: Boolean? = null

  @Field val groupId: String? = null
}

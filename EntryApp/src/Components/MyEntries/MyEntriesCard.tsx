import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface MyEntriesCardProps {
  category: string;
  type: 'Singles' | 'Doubles';
  ageGroup: string;
  name: string;
  dob: string;
  academy: string;
  place: string;
  tnbaId: string;
  partnerName?: string;
  partnerDob?: string;
  partnerId?: string;
  status: 'Paid' | 'Pending' | 'Cancelled';
  entryId: string;
  submittedDate: string;
  onView: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPayNow?: () => void;
}

const statusColors: Record<string, string> = {
  Paid: 'text-green-600 bg-green-100',
  Pending: 'text-yellow-600 bg-yellow-100',
  Cancelled: 'text-red-600 bg-red-100',
};

const MyEntriesCard: React.FC<MyEntriesCardProps> = ({
  category,
  type,
  ageGroup,
  name,
  dob,
  academy,
  place,
  tnbaId,
  partnerName,
  partnerDob,
  partnerId,
  status,
  entryId,
  submittedDate,
  onView,
  onEdit,
  onDelete,
  onPayNow,
}) => {
  return (
    <View className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-base font-semibold text-blue-700">
          {`${ageGroup} ${category} - ${type}`}
        </Text>
        <View className={`px-2 py-1 rounded-full ${statusColors[status]}`}>
          <Text className="text-xs font-medium">{status}</Text>
        </View>
      </View>

      {/* Details */}
      <View className="space-y-1">
        <Text className="text-sm text-gray-700">👤 Name: {name}</Text>
        <Text className="text-sm text-gray-700">🎂 DOB: {dob}</Text>
        <Text className="text-sm text-gray-700">🏠 Academy: {academy}</Text>
        <Text className="text-sm text-gray-700">📍 Place: {place}</Text>
        <Text className="text-sm text-gray-700">🆔 TNBA ID: {tnbaId}</Text>

        {type === 'Doubles' && partnerName && (
          <>
            <Text className="text-sm text-gray-700">🤝 Partner: {partnerName}</Text>
            <Text className="text-sm text-gray-700">🎂 Partner DOB: {partnerDob}</Text>
            <Text className="text-sm text-gray-700">🆔 Partner ID: {partnerId}</Text>
          </>
        )}

        <Text className="text-sm text-gray-600 mt-1">📅 Submitted on: {submittedDate}</Text>
        <Text className="text-sm text-gray-600">🧾 Entry ID: {entryId}</Text>
      </View>

      {/* Actions */}
      <View className="flex-row justify-end mt-4 space-x-4">
        <TouchableOpacity onPress={onView} className="flex-row items-center space-x-1">
          <Feather name="eye" size={18} color="#1E40AF" />
          <Text className="text-blue-700 font-medium">View</Text>
        </TouchableOpacity>

        {status !== 'Paid' && onPayNow && (
          <TouchableOpacity onPress={onPayNow} className="flex-row items-center space-x-1">
            <MaterialIcons name="payment" size={18} color="#D97706" />
            <Text className="text-yellow-600 font-medium">Pay Now</Text>
          </TouchableOpacity>
        )}

        {onEdit && (
          <TouchableOpacity onPress={onEdit} className="flex-row items-center space-x-1">
            <Feather name="edit" size={18} color="#059669" />
            <Text className="text-green-600 font-medium">Edit</Text>
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity onPress={onDelete} className="flex-row items-center space-x-1">
            <Feather name="trash-2" size={18} color="#DC2626" />
            <Text className="text-red-600 font-medium">Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MyEntriesCard;

require 'spec_helper'

describe Account do
  let(:account) { build Account }

  it 'builds' do
    account.should be_an Account
    account.errors.should == {}
  end

  context 'with a password' do
    let(:password) { Faker::Internet.password }
    let(:account) { build Account, password: password }

    it 'does not store the password internally' do
      account.to_yaml.should_not include password
    end

    it 'has a salt' do
      account.salt.should_not be_blank
    end

    it 'validates a correct password' do
      account.should be_correct_password(password)
    end

    it 'invalidates a wrong password' do
      account.should_not be_correct_password('wrong password')
    end
  end
end
